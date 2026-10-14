import { Link } from "react-router-dom";
function Hero() {
  return (
    <section
      data-reveal
      className="reveal-section hero-section flex min-h-150 items-center"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Move around your city
            <br />
            the <span className="text-purple-700">smart way</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-lg">
            Browse the CycleEazy fleet, check station availability and manage
            rental records from one place.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              className="bg-purple-700 text-white px-7 py-3 rounded-xl font-semibold hover:bg-purple-800"
              to="/bikes"
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
