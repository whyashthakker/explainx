import AuthForm from "../_components/AuthForm";
export default function page() {
  return (
    <AuthForm
      label="Register"
      labelText="Enter your email below to register on infloq.com"
      backButtonHref="/login"
      backButtonText="Login"
      backButtonLabel=" Already have an account ?"
      submitButton="Register"
      formType="register"
    />
  );
}
