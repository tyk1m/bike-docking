function SignUp() {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/bikelogo.jpg"
            alt="BikeDock"
            className="h-28 w-28 rounded-full object-cover mx-auto shadow-lg hover:scale-105 transition-transform duration-300"
          />

          <h1 className="text-3xl font-bold text-gray-900 mt-5">
            Create your account
          </h1>

          <p className="text-gray-500 mt-2">
            Join BikeDock and start riding today.
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            {/* Confirm Password */}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 mt-6">
              <input type="checkbox" className="mt-1 accent-purple-700" />

              <p className="text-sm text-gray-500">
                I agree to the{" "}
                <span className="text-purple-700 font-semibold cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-purple-700 font-semibold cursor-pointer">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3.5 rounded-xl font-semibold mt-7 hover:bg-purple-800 hover:scale-[1.02] transition duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span className="text-purple-700 font-semibold cursor-pointer hover:text-purple-900">
              Log in
            </span>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">
          <span className="text-sm text-gray-500 hover:text-purple-700 cursor-pointer">
            <a href="/">← Back to BikeDock</a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
