import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InvoiceList from "./components/InvoiceList";
import Login from "./components/Login";
import SignOut from "./components/SignOut";
import Modal from "./components/Modal";
import InvoiceForm from "./components/InvoiceForm";
import Invoice from "./components/Invoice";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const modal = useRef(null);
  let navigate = useNavigate();

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
      <>
        <div className="App">
          <SignOut />
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={() => modal.current.open()}>Open Modal</button>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/invoices"
              element={
                <PrivateRoute>
                  <InvoiceList />
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
        </div>
        <Modal ref={modal}>
          <InvoiceForm />
        </Modal>
      </>
    );
  }
}

export default App;
