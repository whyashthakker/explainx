import AuthForm from "../_components/AuthForm";

export default function page() {
  return (
    <AuthForm
      label="Login"
      labelText="Enter your email below to Login on infloq.com"
      backButtonHref="/register"
      backButtonText="Register"
      backButtonLabel="Don't have an account ?"
      submitButton="Login"
      formType="login"
    />
  );
}
