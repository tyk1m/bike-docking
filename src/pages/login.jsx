import { SignIn } from "@clerk/react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="min-h-screen bg-purple-50 flex items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/images/CycleEazy%20logo.png"
          alt="CycleEazy"
          className="h-20 w-36 object-contain"
        />
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
          fallbackRedirectUrl="/"
        />
        <Link
          to="/"
          className="text-sm font-medium text-purple-700 underline underline-offset-4 hover:text-purple-950"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}

export default Login;
