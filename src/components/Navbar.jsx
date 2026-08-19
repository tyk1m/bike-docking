function Navbar() {
  return (
    <nav className="h-18 bg-purple-500 flex items-center px-6">
      <div className="flex items-center gap-3">
        <img
          src="/images/bikelogo.jpg"
          alt="BikeDock logo"
          className="w-11 h-11 rounded-full object-cover"
        />
        <a href="/" className="text-black font-medium hover:text-white">
          <span>BikeDock</span>
        </a>
      </div>

      <div className="flex items-center gap-8 ml-12">
        <a href="#" className="text-black font-medium hover:text-white">
          Stations
        </a>

        <a href="#" className="text-black font-medium hover:text-white">
          Bikes
        </a>

        <a href="#" className="text-black font-medium hover:text-white">
          My Rentals
        </a>
      </div>

      <div className="flex items-center gap-5 ml-auto">
        <a
          href="/Login"
          className="bg-purple-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-950"
        >
          Login
        </a>

        <a href="/SignUp" className="text-black font-semibold hover:text-white">
          Sign Up
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
