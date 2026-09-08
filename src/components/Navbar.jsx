import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="relative w-full flex items-center justify-between px-8 py-4
                bg-linear-to-r from-purple-700 via-purple-800 to-purple-950
                shadow-[0_8px_25px_rgba(88,28,135,0.35)]
                overflow-hidden"
    >
      {/* Glossy shine */}
      <div
        className="absolute inset-0 bg-linear-to-b
                  from-white/25 via-transparent to-transparent
                  pointer-events-none"
      ></div>
      <div className="flex items-center gap-0">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/CycleEazy%20logo.png"
            alt="CycleEazy"
            className="h-16 w-30 object-contain rounded-lg "
          />
        </div>

        {/* Project name */}
        <Link to="/" end className="rounded-lg py-1">
          <span className="bg-linear-to-b from-zinc-950 via-black to-zinc-500 bg-clip-text text-2xl font-black tracking-wide text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.45)]">
            CycleEazy
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div
        className="flex items-center gap-3 rounded-full 
          bg-purple-500/30 px-4 py-2 
                shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),
                        inset_-2px_-2px_5px_rgba(255,255,255,0.15)]"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `text-black px-5 py-2 rounded-lg transition ${
              isActive
                ? "font-semibold text-purple-950 underline decoration-2 underline-offset-4"
                : "hover:bg-purple-200/60"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/stations"
          className={({ isActive }) =>
            `text-black px-5 py-2 rounded-lg transition ${
              isActive
                ? "font-semibold text-purple-950 underline decoration-2 underline-offset-4"
                : "hover:bg-purple-200/60"
            }`
          }
        >
          Stations
        </NavLink>

        <NavLink
          to="/bikes"
          className={({ isActive }) =>
            `text-black px-5 py-2 rounded-lg transition ${
              isActive
                ? "font-semibold text-purple-950 underline decoration-2 underline-offset-4"
                : "hover:bg-purple-200/60"
            }`
          }
        >
          Bikes
        </NavLink>

        <NavLink
          to="/my-rentals"
          className={({ isActive }) =>
            `text-black px-5 py-2 rounded-lg transition ${
              isActive
                ? "font-semibold text-purple-950 underline decoration-2 underline-offset-4"
                : "hover:bg-purple-200/60"
            }`
          }
        >
          My Rentals
        </NavLink>
      </div>

      {/* Login / Sign Up */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="px-5 py-2 rounded-full bg-purple-900 text-white
                 shadow-[4px_4px_8px_rgba(0,0,0,0.25),
                         -3px_-3px_8px_rgba(255,255,255,0.15)]
                 hover:scale-105 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-5 py-2 rounded-full text-white
                 hover:bg-purple-600 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
