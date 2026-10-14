import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BikeCard from '../components/bikeCard.jsx';
import Navbar from '../components/Navbar';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { useAuth } from '../lib/useAuth';
import { getBikes, startRental } from '../lib/bikeApi';

function Bikes() {
  const pageRef = useIntersectionReveal();
  const { user } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [busyBike, setBusyBike] = useState('');

  useEffect(() => {
    let active = true;
    getBikes()
      .then((result) => { if (active) setBikes(result); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function rentBike(bike) {
    if (!user) {
      setError('Sign in to rent a bike.');
      return;
    }
    setBusyBike(bike.id);
    setError('');
    try {
      await startRental(bike.id);
      const latest = await getBikes();
      setBikes(latest);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyBike('');
    }
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-purple-50">
      <Navbar />
      <main data-reveal className="reveal-section px-6 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-purple-800">Find a Bike</h1>
          <p className="mt-2 text-gray-600">Choose an available bike and start your ride.</p>
          {user && <p className="mt-2 text-sm text-purple-700">Signed in as {user.email}</p>}
        </div>
        {error && <p role="alert" className="mx-auto mb-6 max-w-3xl rounded-lg bg-red-100 p-4 text-red-800">{error}</p>}
        {!user && <p className="mx-auto mb-6 max-w-3xl rounded-lg bg-purple-100 p-4 text-purple-900">You can browse bikes now. <Link to="/login" className="font-semibold underline">Sign in</Link> to rent one.</p>}
        <p className="mx-auto mb-6 max-w-3xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Demo rentals update availability and rental records only. They do not verify eligibility, collect payment, or unlock a physical bike.</p>
        {loading && <p role="status" className="text-center text-gray-600">Loading bikes…</p>}
        {!loading && !error && bikes.length === 0 && <p className="text-center text-gray-600">No bikes are available yet.</p>}
        {!loading && bikes.length > 0 && <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => <BikeCard key={bike.id} bike={bike} onRent={rentBike} busy={busyBike === bike.id} />)}
        </div>}
      </main>
    </div>
  );
}

export default Bikes;
