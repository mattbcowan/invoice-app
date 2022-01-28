import { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import InvoiceList from "./components/InvoiceList";
import Login from "./components/Login";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  const getUser = (user) => {
    try {
      setLoading(true);
      let userRef = ref(db, "/users/" + user);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUser(data);
        setLoading(false);
      });
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getUser("USR1234");
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/invoices"
            element={
              <PrivateRoute>
                <InvoiceList data={user.invoices} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
