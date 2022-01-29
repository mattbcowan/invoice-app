import { getAuth, signOut } from "firebase/auth";
import React from "react";

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth).catch((error) => {
    console.error(error);
  });
};

const SignOut = () => {
  return (
    <div>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </div>
  );
};

export default SignOut;
