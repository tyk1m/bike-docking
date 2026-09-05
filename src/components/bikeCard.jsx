function BikeCard({ bike }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Bike Image */}
      <div className="h-48 bg-purple-100 flex items-center justify-center">
        <img
          src={bike.image}
          alt={bike.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Bike Information */}
      <div className="p-5">
        {/* Bike Name and Availability */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-800">{bike.name}</h2>

          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              bike.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {bike.available ? "Available" : "In Use"}
          </span>
        </div>

        {/* Bike Type */}
        <p className="text-gray-500 mb-2">{bike.type}</p>

        {/* Station */}
        <p className="text-gray-600 mb-2">📍 {bike.station}</p>

        {/* Price */}
        <p className="text-purple-700 font-bold text-lg mb-4">
          KSh {bike.price} / hour
        </p>

        {/* Rent Button */}
        <button
          disabled={!bike.available}
          className={`w-full py-3 rounded-xl font-semibold ${
            bike.available
              ? "bg-purple-700 text-white hover:bg-purple-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {bike.available ? "Rent Bike" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default BikeCard;
