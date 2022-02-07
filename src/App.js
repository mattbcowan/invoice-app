import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InvoiceList from "./components/invoiceList/InvoiceList";
import Login from "./components/Login";
import SignOut from "./components/SignOut";
import Modal from "./components/Modal";
import InvoiceForm from "./components/form/InvoiceForm";
import Invoice from "./components/invoice/Invoice";
import ErrorBoundary from "./components/ErrorBoundary";
import styled from "styled-components";
import GlobalStyle from "./theme/globalStyles";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const modal = useRef(null);

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <ErrorBoundary>
        <GlobalStyle />
        <AppContainer>
          <SignOut />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/invoices"
                element={
                  <PrivateRoute>
                    <InvoiceList modal={modal} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/invoices/:invoiceId"
                element={
                  <PrivateRoute>
                    <Invoice modal={modal} />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Wrapper>
        </AppContainer>
        <Modal ref={modal}>
          <InvoiceForm modal={modal} />
        </Modal>
      </ErrorBoundary>
    );
  }
}

const AppContainer = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div``;

export default App;
