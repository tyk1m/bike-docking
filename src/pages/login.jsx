import { SignIn } from "@clerk/react";

function Login() {
  return (
    <main className="min-h-screen bg-purple-50 flex items-center justify-center px-6 py-12">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
        fallbackRedirectUrl="/"
      />
    </main>
  );
}

export default Login;
