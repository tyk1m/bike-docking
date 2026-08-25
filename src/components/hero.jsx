import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="bg-white min-h-150 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 py-16 grid grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Move around your city
            <br />
            the <span className="text-purple-700">smart way</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            BikeDock makes urban travel simple, affordable and eco-friendly.
            Find a bike near you and ride anywhere, anytime.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              className="bg-purple-700 text-white px-7 py-3 rounded-xl font-semibold hover:bg-purple-800"
              to="/login"
            >
              Find a Bike
            </Link>

            <Link className="border-2 border-purple-700 text-purple-700 px-7 py-3 rounded-xl font-semibold hover:bg-purple-50">
              View Stations
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/images/bikehero.jpg"
            alt="BikeDock bicycle"
            className="w-full max-w-xl object-contain rounded-3xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
