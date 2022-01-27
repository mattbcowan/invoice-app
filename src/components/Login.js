import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const handleSignIn = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage);
    });
};

const Login = () => {
  return (
    <div>
      <button onClick={() => handleSignIn}>Sign In</button>
    </div>
  );
};

export default Login;
