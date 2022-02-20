import React from "react";
import { db, auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { SignInWithGoogle } from "./styled/Button";
import { H2, Body1 } from "./Typography";
import styled from "styled-components";
import useWindowSize from "./hooks/useWindowSize";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const screenSize = useWindowSize();

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
    <Wrapper width={screenSize.width} height={screenSize.height}>
      <Container>
        <Header>Sign In</Header>
        <BodyText>
          Thanks for checking out my app! You can sign in with your Google
          account.
        </BodyText>
        <SignInWithGoogle
          onClick={() => {
            handleSignIn().then(() => navigate("/invoices"));
          }}
        >
          Sign In With Google
        </SignInWithGoogle>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #141625;
`;

const Container = styled.div`
  margin: 1em;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2em;
  box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled(H2)`
  margin-bottom: 1em;
`;

const BodyText = styled(Body1)`
  margin-bottom: 1em;
`;

export default Login;
