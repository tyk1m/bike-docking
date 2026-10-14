import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSignIn from '../components/GoogleSignIn';
import { useAuth } from '../lib/useAuth';

function SignUp() {
  const navigate = useNavigate();
  const { signUp, verifyEmail } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [awaitingCode, setAwaitingCode] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (awaitingCode) {
        await verifyEmail(email, code);
        navigate('/bikes');
      } else {
        await signUp(fullName, email, phoneNumber, password);
        setAwaitingCode(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function handleGoogleError(message) { setError(message); }
  function handleGoogleSuccess() { navigate('/bikes'); }

  return (
    <main className="flex min-h-screen items-center justify-center bg-purple-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <Link to="/" className="mb-6 flex justify-center"><img src="/images/CycleEazy%20logo.png" alt="CycleEazy" className="h-20 w-36 object-contain" /></Link>
        <h1 className="text-center text-3xl font-bold text-purple-900">{awaitingCode ? 'Verify your email' : 'Create your account'}</h1>
        <p className="mt-2 text-center text-gray-600">{awaitingCode ? `Enter the 6-digit code sent to ${email}.` : 'Join CycleEazy and find your next ride.'}</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {!awaitingCode && <>
            <label className="block text-sm font-medium text-gray-700">Full name<input value={fullName} onChange={(event) => setFullName(event.target.value)} type="text" autoComplete="name" required minLength={2} maxLength={120} className="mt-1 w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100" /></label>
            <label className="block text-sm font-medium text-gray-700">Email address<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required maxLength={320} className="mt-1 w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100" /></label>
            <label className="block text-sm font-medium text-gray-700">M-Pesa phone number<input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} type="tel" autoComplete="tel" inputMode="tel" placeholder="0712 345 678" required maxLength={20} aria-describedby="mpesa-phone-hint" className="mt-1 w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100" /><span id="mpesa-phone-hint" className="mt-1 block text-xs text-gray-500">Use the number that should receive the M-Pesa prompt when you pay.</span></label>
            <label className="block text-sm font-medium text-gray-700">Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="new-password" required minLength={8} maxLength={128} className="mt-1 w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100" /><span className="mt-1 block text-xs text-gray-500">Use at least 8 characters.</span></label>
          </>}
          {awaitingCode && <label className="block text-sm font-medium text-gray-700">6-digit verification code<input value={code} onChange={(event) => setCode(event.target.value)} type="text" inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9]{6}" minLength={6} maxLength={6} className="mt-1 w-full rounded-xl border border-purple-200 px-4 py-3 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100" /></label>}
          {error && <p role="alert" className="rounded-lg bg-red-100 p-3 text-sm text-red-800">{error}</p>}
          <button type="submit" disabled={busy} className="w-full rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800 disabled:opacity-60">{busy ? (awaitingCode ? 'Verifying…' : 'Sending code…') : (awaitingCode ? 'Verify email and continue' : 'Create account')}</button>
        </form>
        {!awaitingCode && <><div className="my-5 flex items-center gap-3 text-xs text-gray-400"><span className="h-px flex-1 bg-gray-200" />OR<span className="h-px flex-1 bg-gray-200" /></div><GoogleSignIn onError={handleGoogleError} onSuccess={handleGoogleSuccess} phoneNumber={phoneNumber} /></>}
        <p className="mt-6 text-center text-sm text-gray-600">Already registered? <Link to="/login" className="font-semibold text-purple-700 underline">Sign in</Link></p>
        <Link to="/" className="mt-4 block text-center text-sm text-purple-700 underline">Back to homepage</Link>
      </div>
    </main>
  );
}

export default SignUp;
