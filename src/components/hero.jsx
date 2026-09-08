import { Link } from "react-router-dom";
function Hero() {
  return (
    <section
      data-reveal
      className="reveal-section hero-section min-h-150 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full px-6 py-16 grid grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold text-white leading-tight">
            Move around your city
            <br />
            the <span className="text-purple-700">smart way</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-lg">
            CycleEazy makes urban travel simple, affordable and eco-friendly.
            Find a bike near you and ride anywhere, anytime.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              className="bg-purple-700 text-white px-7 py-3 rounded-xl font-semibold hover:bg-purple-800"
              to="/login"
            >
              Find a Bike
            </Link>

            <Link
              className="border-2 border-purple-700 text-purple-700 px-7 py-3 rounded-xl font-semibold hover:bg-purple-50"
              to="/stations"
            >
              View Stations
            </Link>
          </div>
        </div>

        <div className="hero-image-wrap flex justify-center">
          <img
            src="/images/bikehero.jpg"
            alt="CycleEazy bicycle"
            className="hero-image w-full max-w-xl object-contain rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
