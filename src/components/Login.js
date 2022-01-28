import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";

const handleSignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const checkForUserInDatabase = ref(db, `users/${user.uid}`);
      onValue(checkForUserInDatabase, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          set(ref(db, `users/${user.uid}`), {
            id: user.uid,
            name: user.displayName,
            avatar: user.photoURL,
            email: user.email,
            invoices: [],
          });
        }
      });
      console.log(user);
      return user;
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
      <button onClick={() => handleSignIn()}>Sign In</button>
    </div>
  );
};

export default Login;
