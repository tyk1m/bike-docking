import { useState } from "react";
import Navbar from "../components/Navbar";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal";

function Stations() {
  const pageRef = useIntersectionReveal();
  const [search, setSearch] = useState("");

  const stations = [
    {
      id: 1,
      name: "JKUAT Main Gate",
      location: "Juja, Kiambu",
      bikes: 12,
      docks: 8,
      status: "Available",
    },
    {
      id: 2,
      name: "Gate C Station",
      location: "Jkuat, Juja",
      bikes: 5,
      docks: 15,
      status: "Few Bikes",
    },
    {
      id: 3,
      name: "Gate B Station",
      location: "JKUAT, Juja",
      bikes: 18,
      docks: 2,
      status: "Available",
    },
  ];

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-purple-50">
      <Navbar />
      {/* Header */}
      <section
        data-reveal
        className="reveal-section bg-purple-700 text-white py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find a Bike Station
          </h1>

          <p className="text-purple-100 text-lg mb-8">
            Find available bikes and docking stations near you.
          </p>

          {/* Search */}
          <div className="max-w-2xl">
            <input
              type="text"
              placeholder="Search for a station..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white px-5 py-4 rounded-xl text-gray-800 placeholder-gray-500 outline-none border border-gray-200 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <main
        data-reveal
        className="reveal-section reveal-from-right max-w-6xl mx-auto px-6 py-12"
      >
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500">Total Stations</p>
            <h2 className="text-3xl font-bold text-purple-700">
              {stations.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500">Bikes Available</p>
            <h2 className="text-3xl font-bold text-purple-700">
              {stations.reduce((total, station) => total + station.bikes, 0)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500">Docks Available</p>
            <h2 className="text-3xl font-bold text-purple-700">
              {stations.reduce((total, station) => total + station.docks, 0)}
            </h2>
          </div>
        </div>

        {/* Station heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Nearby Stations</h2>

          <button className="text-purple-700 font-semibold hover:text-purple-900">
            Use My Location
          </button>
        </div>

        {/* Station cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-purple-100 flex items-center justify-center">
                <span className="text-5xl">🚲</span>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {station.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      📍 {station.location}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      station.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {station.status}
                  </span>
                </div>

                {/* Availability */}
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-gray-500 text-sm">Bikes</p>

                    <p className="text-2xl font-bold text-purple-700">
                      🚲 {station.bikes}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-gray-500 text-sm">Docks</p>

                    <p className="text-2xl font-bold text-purple-700">
                      🅿️ {station.docks}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full bg-purple-700 text-white py-3 rounded-xl font-semibold hover:bg-purple-800 transition">
                  View Station
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredStations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stations found.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Stations;
