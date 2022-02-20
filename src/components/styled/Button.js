import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.dark ? "#252945" : "#F9FAFE")};
  color: ${(props) => (props.dark ? "#DFE3FA" : "#7E88C3")};
  cursor: pointer;
  font-size: 12px;
  letter-spacing: -0.25;
  line-height: 15px;
  border: none;
  border-radius: 48px;
  padding: 16px;
  transition: 250ms ease-out;
  width: ${(props) => props.width};
  &:hover {
    background: ${(props) => (props.dark ? "#FFFFFF" : "#DFE3FA")};
    color: ${(props) => (props.dark ? "#7E88C3" : "#7E88C3")};
    transition: 300ms ease-out;
  }

  &:disabled {
    background: #f9fafe;
    color: #7e88c3;
    transition: none;
    cursor: not-allowed;
  }

  &:disabled:hover {
    background: #f9fafe;
    color: #7e88c3;
    transition: none;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: #7c5dfa;
  color: #ffffff;

  &:hover {
    background: #9277ff;
    color: #ffffff;
  }
`;

const IconButton = styled(Button)`
  background: #7c5dfa;
  color: #ffffff;
  padding: 6px;
  padding-right: 8px;
  &:hover {
    background: #9277ff;
    color: #ffffff;
  }
`;

const SecondaryButton = styled(Button)`
  background: #373b53;
  color: ${(props) => (props.dark ? "#1E2139" : "#888EB0")};

  &:hover {
    background: ${(props) => (props.dark ? "#1E2139" : "#0C0E16")};
    color: ${(props) => (props.dark ? "#DFE3FA" : "#888EB0")};
  }
`;

const DangerButton = styled(Button)`
  background: #ec5757;
  color: #ffffff;

  &:hover {
    background: #ff9797;
    color: #ffffff;
  }
`;

const SignInWithGoogle = styled(Button)`
  background: #2ecc71;
  color: #ffffff;

  &:hover {
    background: #27ae60;
    color: #ffffff;
  }
`;

export {
  Button,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  SignInWithGoogle,
};
