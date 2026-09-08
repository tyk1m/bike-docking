import { useState } from "react";
import Navbar from "../components/Navbar";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal";

function MyRentals() {
  const pageRef = useIntersectionReveal();
  const [currentRental] = useState({
    bikeId: "BK-001",
    station: "JKUAT Main Gate",
    startTime: "Today, 10:30 AM",
    duration: "1 hr 20 mins",
    status: "Active",
  });

  const [rentalHistory] = useState([
    {
      id: 1,
      bikeId: "BK-004",
      station: "Gate B Station",
      date: "2 Sept 2026",
      duration: "45 mins",
      cost: "KSh 50",
    },
    {
      id: 2,
      bikeId: "BK-008",
      station: "Juja Mall",
      date: "28 Aug 2026",
      duration: "1 hr 15 mins",
      cost: "KSh 100",
    },
  ]);

  return (
    <div ref={pageRef} className="min-h-screen bg-purple-50">
      <Navbar />

      {/* Page Header */}
      <main data-reveal className="reveal-section max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-purple-800">My Rentals</h1>
        <p className="text-gray-600 mt-2">
          View your current and previous bike rentals.
        </p>

        {/* Current Rental */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            Current Rental
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold">Bike ID:</span>
                {currentRental.bikeId}
              </p>
              <p>
                <span className="font-semibold">Station:</span>
                {currentRental.station}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Started:</span>
                {currentRental.startTime}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>
                {currentRental.duration}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full">
              {currentRental.status}
            </span>

            <button className="bg-purple-700 text-white px-5 py-2 rounded-xl hover:bg-purple-800 transition">
              Return Bike
            </button>
          </div>
        </div>

        {/* Rental History */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            Rental History
          </h2>

          <div className="space-y-4">
            {rentalHistory.map((rental) => (
              <div
                key={rental.id}
                className="bg-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">{rental.bikeId}</h3>
                  <p className="text-gray-600">{rental.station}</p>
                  <p className="text-sm text-gray-500">{rental.date}</p>
                </div>

                <div className="mt-3 md:mt-0">
                  <p>Duration: {rental.duration}</p>
                  <p className="font-semibold text-purple-700">{rental.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyRentals;
