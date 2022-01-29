import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const provider = new GoogleAuthProvider();

  const createUser = (user) => {
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
  };

  const handleSignIn = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        createUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          handleSignIn().then(() => navigate("/invoices"));
        }}
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;
