import { Link } from "react-router-dom";
import { useState } from "react";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters.",
    "any.required": "Password is required.",
  }),
});
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate(
      { email, password },
      { abortEarly: false },
    );
    setError(error?.details[0]?.message || "");
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/images/bikelogo.jpg"
            alt="BikeDock"
            className="h-28 w-28 rounded-full object-cover mx-auto shadow-lg hover:scale-105 transition-transform duration-300"
          />

          <h1 className="text-3xl font-bold text-gray-900 mt-5">
            Welcome back
          </h1>

          <p className="text-gray-500 mt-2">
            Log in to continue riding with BikeDock.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-purple-700 font-semibold hover:text-purple-900"
                >
                  Forgot password?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 mt-6">
              <input type="checkbox" className="accent-purple-700" />

              <span className="text-sm text-gray-500">Remember me</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3.5 rounded-xl font-semibold mt-7 hover:bg-purple-800 hover:scale-[1.02] transition duration-300"
            >
              Log In
            </button>
          </form>

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-700 font-semibold hover:text-purple-900"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">
          <span className="text-sm text-gray-500 hover:text-purple-700 cursor-pointer">
            <Link to="/">← Back to BikeDock</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
