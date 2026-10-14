import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/useAuth';
import GoogleSignIn from '../components/GoogleSignIn';

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function handleGoogleError(message) { setError(message); }
  function handleGoogleSuccess() { navigate('/bikes'); }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signIn(email, password);
      navigate('/bikes');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-purple-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <Link to="/" className="mb-6 flex justify-center">
          <img src="/images/CycleEazy%20logo.png" alt="CycleEazy" className="h-20 w-36 object-contain" />
        </Link>
        <h1 className="text-center text-3xl font-bold text-purple-900">Welcome back</h1>
        <p className="mt-2 text-center text-gray-600">Sign in to manage your rides.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-gray-700">
            Email address
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required maxLength={320} className="mt-1 w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" required maxLength={128} className="mt-1 w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100" />
          </label>
          {error && <p role="alert" className="rounded-lg bg-red-100 p-3 text-sm text-red-800">{error}</p>}
          <button type="submit" disabled={busy} className="w-full rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800 disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-gray-400"><span className="h-px flex-1 bg-gray-200" />OR<span className="h-px flex-1 bg-gray-200" /></div>
        <GoogleSignIn onError={handleGoogleError} onSuccess={handleGoogleSuccess} />
        <p className="mt-6 text-center text-sm text-gray-600">New to CycleEazy? <Link to="/signup" className="font-semibold text-purple-700 underline">Create an account</Link></p>
        <Link to="/" className="mt-4 block text-center text-sm text-purple-700 underline">Back to homepage</Link>
      </div>
    </main>
  );
}

export default Login;
