import { useEffect, useRef } from 'react';
import { useAuth } from '../lib/useAuth';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function GoogleSignIn({ onError, onSuccess, phoneNumber }) {
  const buttonRef = useRef(null);
  const callbacksRef = useRef({ onError, onSuccess, phoneNumber });
  const { signInWithGoogle } = useAuth();
  useEffect(() => { callbacksRef.current = { onError, onSuccess, phoneNumber }; }, [onError, onSuccess, phoneNumber]);

  useEffect(() => {
    if (!googleClientId || !buttonRef.current) return undefined;

    let cancelled = false;
    const initialize = () => {
      if (cancelled || !window.google?.accounts?.id || !buttonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async ({ credential }) => {
          try {
            await signInWithGoogle(credential, callbacksRef.current.phoneNumber);
            callbacksRef.current.onSuccess();
          } catch (error) {
            callbacksRef.current.onError(error.message);
          }
        },
      });
      window.google.accounts.id.renderButton(buttonRef.current, { theme: 'outline', size: 'large', width: 360, text: 'continue_with' });
    };

    if (window.google?.accounts?.id) initialize();
    else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = initialize;
      document.head.appendChild(script);
    }
    return () => { cancelled = true; };
  }, [signInWithGoogle]);

  if (!googleClientId) return <p className="text-center text-sm text-gray-500">Google sign-in will be available after OAuth is configured.</p>;
  return <div className="flex justify-center" ref={buttonRef} />;
}

export default GoogleSignIn;
