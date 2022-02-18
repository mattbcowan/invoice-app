import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import { Flexbox } from "./Box";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error(error);
    });
  };

  return (
    <Flexbox
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg={"#373B53"}
    >
      <div>
        <img src="/logo.svg" alt="Header Logo" />
      </div>
      <div>
        <ProfileContainer>
          <ProfileImg
            src={user.photoURL}
            alt="Profile Picture"
            onClick={handleSignOut}
          />
        </ProfileContainer>
      </div>
    </Flexbox>
  );
};

const ProfileImg = styled("img")({
  objectFit: "contain",
  width: "100%",
});

const ProfileContainer = styled("div")({
  width: "32px",
  height: "32px",
  borderRadius: "30px",
  overflow: "hidden",
  marginRight: "16px",
});

export default Header;
