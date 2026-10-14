import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { useAuth } from '../lib/useAuth';
import { getRentals, returnRental } from '../lib/bikeApi';

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function formatDuration(from, to) {
  const minutes = Math.max(0, Math.round((new Date(to).getTime() - new Date(from).getTime()) / 60000));
  if (minutes >= 60) return `${Math.floor(minutes / 60)} hr ${minutes % 60} mins`;
  return `${minutes} mins`;
}

function MyRentals() {
  const pageRef = useIntersectionReveal();
  const { user, loading: authLoading } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState('');
  const [busyRental, setBusyRental] = useState('');
  const [loadedFor, setLoadedFor] = useState(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!user) return undefined;
    let active = true;
    getRentals()
      .then((result) => { if (active) setRentals(result); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoadedFor(user.id); });
    return () => { active = false; };
  }, [user]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  async function handleReturn(rentalId) {
    setBusyRental(rentalId);
    setError('');
    try {
      await returnRental(rentalId);
      setRentals(await getRentals());
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyRental('');
    }
  }

  const activeRentals = rentals.filter((rental) => !rental.returnedAt);
  const history = rentals.filter((rental) => rental.returnedAt);

  return (
    <div ref={pageRef} className="min-h-screen bg-purple-50">
      <Navbar />
      <main data-reveal className="reveal-section mx-auto max-w-6xl p-6">
        <h1 className="text-4xl font-bold text-purple-800">My Rentals</h1>
        <p className="mt-2 text-gray-600">{user ? `Rentals for ${user.email}.` : 'View your current and previous bike rentals.'}</p>
        {error && <p role="alert" className="mt-6 rounded-lg bg-red-100 p-4 text-red-800">{error}</p>}
        {!authLoading && !user && <p className="mt-6 rounded-lg bg-purple-100 p-4 text-purple-900">Please <Link to="/login" className="font-semibold underline">sign in</Link> to view your rentals.</p>}
        {(authLoading || (user && loadedFor !== user.id)) && <p role="status" className="mt-6 text-gray-600">Loading rentals…</p>}
        {user && loadedFor === user.id && <>
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-purple-700">Active Rentals</h2>
            {activeRentals.length === 0 ? <p className="text-gray-600">You have no active rentals.</p> : activeRentals.map((rental) => <article key={rental.id} className="mb-4 rounded-xl border border-purple-100 p-5 last:mb-0">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-bold">{rental.bike?.name || rental.bikeId}</h3>
                  <p className="text-gray-600">{rental.bike?.station || 'Station'}</p>
                  <p className="text-sm text-gray-500">Started {formatDate(rental.startedAt)}</p>
                  <p aria-live="polite" className="mt-1 font-semibold text-purple-700">Time with bike: {formatDuration(rental.startedAt, new Date(Math.max(now, Date.parse(rental.startedAt))).toISOString())}</p>
                </div>
                <button disabled={busyRental === rental.id} onClick={() => handleReturn(rental.id)} className="rounded-xl bg-purple-700 px-5 py-2 text-white hover:bg-purple-800 disabled:opacity-60">
                  {busyRental === rental.id ? 'Returning…' : 'Return Bike'}
                </button>
              </div>
            </article>)}
          </section>
          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold text-purple-700">Rental History</h2>
            {history.length === 0 ? <p className="rounded-xl bg-white p-5 text-gray-600">Completed rentals will appear here.</p> : <div className="space-y-4">{history.map((rental) => <article key={rental.id} className="flex flex-col justify-between gap-3 rounded-2xl bg-white p-5 shadow-md md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-bold">{rental.bike?.name || rental.bikeId}</h3>
                <p className="text-gray-600">{rental.bike?.station || 'Station'}</p>
                <p className="text-sm text-gray-500">{formatDate(rental.startedAt)}</p>
              </div>
              <div>
                <p>Duration: {formatDuration(rental.startedAt, rental.returnedAt)}</p>
                <p className="font-semibold text-purple-700">Rate: KSh {rental.bike?.price ?? '—'} / hour</p>
              </div>
            </article>)}</div>}
          </section>
        </>}
      </main>
    </div>
  );
}

export default MyRentals;
