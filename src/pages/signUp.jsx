import { SignUp as ClerkSignUp } from "@clerk/react";

function SignUp() {
  return (
    <main className="min-h-screen bg-purple-50 flex items-center justify-center px-6 py-12">
      <ClerkSignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        fallbackRedirectUrl="/"
      />
    </main>
  );
}

export default SignUp;
