"use client"

import React, { useState } from 'react';
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const DISCORD_INVITE_LINK = "https://discord.gg/FuEWNmUFGF";
const GET_ANSWERS_LINK = "https://chatgpt.com/g/g-LVAKUYjrB-olly-faq"; // Replace with your actual link

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, { message: "Message is required" }),
});

type ContactFormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-2"
          >
            <Image src="/images/logos/discord-logo.png" alt="Discord Logo" width={20} height={20} />
            <span>Join Discord</span>
          </Button>
          <Button 
            onClick={() => window.open(GET_ANSWERS_LINK, '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
          >
            <span>Get Answers with AI ✨</span>
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        We prefer to connect on Discord, but you can also use this form to reach out. For quick answers, try our &quot;Get Answers Now&quot; button - we use data and ChatGPT to answer up to 90% of common questions immediately!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input type="text" placeholder="Your Name" {...register("name")} disabled={isSubmitting} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Input type="email" placeholder="Your Email" {...register("email")} disabled={isSubmitting} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="tel" placeholder="Your Phone (optional)" {...register("phone")} disabled={isSubmitting} />
        </div>
        <div>
          <Input type="text" placeholder="Subject (optional)" {...register("subject")} disabled={isSubmitting} />
        </div>
        <div>
          <Textarea placeholder="Your Message" {...register("message")} disabled={isSubmitting} />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </div>
  );
}