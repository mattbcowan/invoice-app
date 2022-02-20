import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error(error);
    });
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #373b53;
`;

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
