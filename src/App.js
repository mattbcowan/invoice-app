import { useState, useEffect } from "react";
import InvoiceList from "./components/InvoiceList";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignOut from "./components/SignOut";

function App() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
    setLoading(false);
  }, []);

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="App">
        <SignOut />
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
        </Routes>
      </div>
    );
  }
}

export default App;
