import { Link } from "react-router-dom";
function CTA() {
  return (
    <section className="bg-purple-700 py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Ready to ride?
        </h2>

        <p className="text-purple-100 text-lg mt-5 max-w-2xl mx-auto">
          Join BikeDock today and discover a faster, simpler and more affordable
          way to move around your city.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 hover:scale-105 transition duration-300"
            to="/login"
          >
            Get Started
          </Link>

          <Link className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-600 hover:scale-105 transition duration-300">
            Explore Stations
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
