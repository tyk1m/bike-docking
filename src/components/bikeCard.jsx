function BikeCard({ bike, onRent, busy = false }) {
  return <article className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
    <div className="flex h-48 items-center justify-center bg-purple-100">
      <img src={bike.image || "/images/CycleEazy%20logo.png"} alt={bike.name} className="h-full w-full object-cover" />
    </div>
    <div className="p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-gray-800">{bike.name}</h2>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${bike.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{bike.available ? "Available" : "In Use"}</span>
      </div>
      <p className="mb-2 text-gray-500">{bike.type}</p>
      <p className="mb-2 text-gray-600">📍 {bike.station}</p>
      <p className="mb-4 text-lg font-bold text-purple-700">KSh {bike.price} / hour</p>
      <button disabled={!bike.available || busy} onClick={() => onRent(bike)} className={`w-full rounded-xl py-3 font-semibold ${bike.available ? "bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-60" : "cursor-not-allowed bg-gray-300 text-gray-500"}`}>
        {busy ? "Starting rental…" : bike.available ? "Start Demo Rental" : "Unavailable"}
      </button>
    </div>
  </article>;
}
export default BikeCard;
