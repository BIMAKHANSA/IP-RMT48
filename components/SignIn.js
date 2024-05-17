import React from 'react';
import { auth, googleProvider } from '../firebase';

const SignIn = () => {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
