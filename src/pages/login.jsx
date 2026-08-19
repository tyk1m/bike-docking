function Login() {
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
            Welcome back
          </h1>

          <p className="text-gray-500 mt-2">
            Log in to continue riding with BikeDock.
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <form>

            {/* Email */}
            <div>
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

              <div className="flex items-center justify-between mb-2">

                <label className="block text-sm font-semibold text-gray-700">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              />

            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 mt-6">

              <input
                type="checkbox"
                className="accent-purple-700"
              />

              <span className="text-sm text-gray-500">
                Remember me
              </span>

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

            <span className="text-purple-700 font-semibold cursor-pointer hover:text-purple-900">
              Sign up
            </span>

          </p>

        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">

          <span className="text-sm text-gray-500 hover:text-purple-700 cursor-pointer">
            <a href="/">
              ← Back to BikeDock
            </a>
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;