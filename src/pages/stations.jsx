import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { getStations } from '../lib/bikeApi';

function Stations() {
  const pageRef = useIntersectionReveal();
  const [search, setSearch] = useState('');
  const [stations, setStations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getStations()
      .then((result) => { if (active) setStations(result); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filteredStations = useMemo(() => stations.filter((station) => station.name.toLowerCase().includes(search.trim().toLowerCase())), [stations, search]);

  return (
    <div ref={pageRef} className="min-h-screen bg-purple-50">
      <Navbar />
      <main data-reveal className="reveal-section mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-800">Bike Stations</h1>
          <p className="mt-2 text-gray-600">Check bike availability at each station.</p>
        </div>
        <label className="mx-auto mb-8 block max-w-xl">
          <span className="sr-only">Search stations</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search stations…" className="w-full rounded-xl border border-purple-200 bg-white px-5 py-3 shadow-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100" />
        </label>
        {error && <p role="alert" className="mb-6 rounded-lg bg-red-100 p-4 text-red-800">{error}</p>}
        {loading && <p role="status" className="text-center text-gray-600">Loading stations…</p>}
        {!loading && !error && filteredStations.length === 0 && <p className="rounded-xl bg-white p-6 text-center text-gray-600">No stations found.</p>}
        {!loading && filteredStations.length > 0 && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStations.map((station) => <article key={station.name} className="rounded-2xl border border-purple-100 bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-800">{station.name}</h2>
            <p className="mt-2 text-sm text-gray-600">{station.availableBikes} of {station.totalBikes} bikes available</p>
            <Link to="/bikes" className="mt-5 block w-full rounded-xl bg-purple-700 py-3 text-center font-semibold text-white transition hover:bg-purple-800">View Bikes</Link>
          </article>)}
        </div>}
      </main>
    </div>
  );
}

export default Stations;
