import BikeCard from "../components/BikeCard";
import Navbar from "../components/Navbar";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal";

function Bikes() {
  const pageRef = useIntersectionReveal();
  const bikes = [
    {
      name: "Bike #BD-001",
      type: "City Bike",
      station: "JKUAT Main Gate",
      price: 50,
      available: true,
      image: "/images/bike1.jpg",
    },

    {
      name: "Bike #BD-002",
      type: "Mountain Bike",
      station: "Gate B Station",
      price: 70,
      available: true,
      image: "/images/bike2.jpg",
    },

    {
      name: "Bike #BD-003",
      type: "City Bike",
      station: "Juja Mall",
      price: 50,
      available: false,
      image: "/images/bike3.jpg",
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-purple-50">
      <Navbar />

      <main data-reveal className="reveal-section px-6 py-10">
        {/* Page heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-800">Find a Bike</h1>

          <p className="text-gray-600 mt-2">
            Choose an available bike and start your ride.
          </p>
        </div>

        {/* Bike cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <BikeCard key={bike.name} bike={bike} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Bikes;
