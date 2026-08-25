import { Link } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/react";

function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="h-18 bg-purple-500 flex items-center px-6">
      <div className="flex items-center gap-3">
        <img
          src="/images/bikelogo.jpg"
          alt="BikeDock logo"
          className="w-11 h-11 rounded-full object-cover"
        />
        <Link to="/">
          <span className="text-black font-medium hover:text-white">
            BikeDock
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-8 ml-12">
        <Link to="/stations">
          <span className="text-black font-medium hover:text-white">
            Stations
          </span>
        </Link>

        <Link to="/bikes">
          <span className="text-black font-medium hover:text-white">Bikes</span>
        </Link>

        <Link to="/my-rentals">
          <span className="text-black font-medium hover:text-white">
            My Rentals
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-5 ml-auto">
        {!isSignedIn && (
          <>
            <Link to="/login">
              <span className="bg-purple-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-950">
                Login
              </span>
            </Link>
            <Link to="/signup">
              <span className="text-black font-semibold hover:text-white">
                Sign Up
              </span>
            </Link>
          </>
        )}
        {isSignedIn && <UserButton afterSignOutUrl="/" />}
      </div>
    </nav>
  );
}

export default Navbar;
