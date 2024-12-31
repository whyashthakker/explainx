"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCountdown } from "usehooks-ts";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(7, "Password is required of lenght 7 and 8"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required for Login"),
});

export interface IAuthFormProps {
  label: string;
  labelText: string;
  backButtonText: string;
  backButtonHref: string;
  backButtonLabel: string;
  submitButton: string;
  formType: "login" | "register";
}

export default function AuthForm({
  label,
  labelText,
  backButtonText,
  backButtonHref,
  backButtonLabel,
  submitButton,
  formType,
}: IAuthFormProps) {
  const router = useRouter();
  const isRegister = formType === "register" ? true : false;
  const [oneTimError, setOneTimeError] = useState(false);
  const [verificationCounter, setVerificationCounter] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [resendVerificationEmail, setResendVerificationEmail] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });

  const formSchema = isRegister ? signupSchema : loginSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error == "Please verify your email") {
      setResendVerificationEmail(true);
    }
    if (success == "Email Sent") {
      startCountdown();
    }
  }, [error, success]);

  useEffect(() => {
    if (count == 0) {
      resetCountdown();
    }
  }, [count]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSuccess("");
    setError("");
    startTransition(async () => {
      try {
        if (isRegister) {
          // Handle Registration
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Registration failed");
          }

          // If registration successful, automatically sign in
          const signInResult = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });

          if (signInResult?.error) {
            setError(signInResult.error);
            return;
          }

          setSuccess("Registration successful!");
          router.push("/onboarding"); // Redirect to onboarding instead of dashboard
        } else {
          // Handle Login
          const signInResult = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });

          if (signInResult?.error) {
            setError(signInResult.error);
            return;
          }

          router.push("/dashboard");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    });
  }

  async function onResendEmail() {
    if (verificationCounter >= 3) {
      setError("Check Spam Folder");
      return;
    }
    setError("");
    setSuccess("");
  }

  return (
    <div className="w-full lg:grid min-h-[93vh] ">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex flex-col px-8 py-10 rounded-xl border ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto grid w-[350px] gap-6 "
            >
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">{label}</h1>
                <p className="text-balance text-muted-foreground">
                  {labelText}
                </p>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                        disabled={isPending}
                        type="email"
                      />
                    </FormControl>
                    <FormDescription>
                      This is should be your college mail-id.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        {...field}
                        disabled={isPending}
                        type="password"
                      />
                    </FormControl>
                    <FormDescription>This is your mask key.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isRegister && error && (
                <div className="text-sm flex gap-1 justify-start">
                  <button className="underline text-blue-500" type="button">
                    Forgot Password ?
                  </button>
                </div>
              )}
              <FormError message={error} />
              <FormSuccess message={success} />

              <Button type="submit" disabled={isPending}>
                {submitButton}
              </Button>

              <div className="flex items-center gap-2 justify-center">
                <div className="h-[1px] flex-1 bg-gray-200"></div>
                <p className="text-sm text-gray-400">OR</p>
                <div className="h-[1px] flex-1 bg-gray-200"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                Continue with Google
              </Button>
            </form>
            {resendVerificationEmail && (
              <div className="flex gap-3">
                <Button
                  variant={"link"}
                  onClick={onResendEmail}
                  disabled={count < 60 && count > 0}
                >
                  Resend Verification Email
                </Button>
                {count}
              </div>
            )}
            <div className="mt-4 text-sm flex gap-1 justify-center">
              {backButtonLabel}
              <Link href={backButtonHref} className="underline text-blue-500">
                {backButtonText}
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
