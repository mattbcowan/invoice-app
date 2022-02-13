import React from "react";
import styled from "styled-components";
import { Flexbox } from "./Box";

const Header = () => {
  return (
    <Flexbox
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg={"#373B53"}
    >
      <div>
        <img src="./logo.svg" alt="Header Logo" />
      </div>
      <div>
        <ProfileContainer>
          <ProfileImg
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile Picture"
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
