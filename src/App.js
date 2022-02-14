import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import InvoiceList from "./components/invoiceList/InvoiceList";
import Login from "./components/Login";
import Modal from "./components/Modal";
import InvoiceForm from "./components/form/InvoiceForm";
import Invoice from "./components/invoice/Invoice";
import ErrorBoundary from "./components/ErrorBoundary";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyles";
import Header from "./components/Header";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const modal = useRef(null);
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        dispatch({
          type: "SET_USER",
          user: user,
        });
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
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppContainer>
            <Wrapper>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/invoices"
                  element={
                    <>
                      <Header />
                      <PrivateRoute>
                        <InvoiceList modal={modal} />
                      </PrivateRoute>
                    </>
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
        </ThemeProvider>
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
