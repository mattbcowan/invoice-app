import { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <div className="App">
      {error && <p>Error: {error}</p>}
      {loading && <p>loading...</p>}
      {!loading && <Login />}
    </div>
  );
}

export default App;
