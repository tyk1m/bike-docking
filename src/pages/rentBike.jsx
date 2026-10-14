import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../lib/useAuth';

const steps = [
  { number: '01', title: 'Create an account', detail: 'Register with your email and password.', to: '/signup', action: 'Create account' },
  { number: '02', title: 'Get verified in person', detail: 'Visit a CycleEazy station and ask staff about account verification.', to: '/stations', action: 'Find a station' },
  { number: '03', title: 'Choose a bike', detail: 'Browse bikes and their current station availability.', to: '/bikes', action: 'Browse bikes' },
  { number: '04', title: 'Track your rental', detail: 'View and return a recorded rental from your account.', to: '/my-rentals', action: 'My rentals' },
];

function RentBike() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-100">
      <Navbar />
      <main className="px-6 py-10">
        <div className="mx-auto mb-8 max-w-6xl text-center">
          <h1 className="mb-3 text-4xl font-bold text-purple-900 md:text-5xl">Rent a Bike</h1>
          <p className="text-lg text-gray-600">Follow these steps to get started with CycleEazy.</p>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => <article key={step.number} className="flex min-w-0 flex-col items-start gap-3 rounded-xl border border-purple-100 bg-white p-5 shadow-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 font-bold text-purple-800">{step.number}</span>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">{step.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{step.detail}</p>
            </div>
            <Link to={step.number === '01' && user ? '/bikes' : step.to} className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-800">
              {step.number === '01' && user ? 'Account created' : step.action}
            </Link>
          </article>)}
        </div>
        <p className="mx-auto mt-8 max-w-4xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Online identity verification, QR scanning, payment, and physical bike unlocking are not connected yet. Rental records in this setup do not authorize a real bike release.
        </p>
      </main>
    </div>
  );
}

export default RentBike;
