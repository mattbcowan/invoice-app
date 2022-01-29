import { getAuth, signOut } from "firebase/auth";
import React from "react";

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Signed Out");
    })
    .catch((error) => {
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
