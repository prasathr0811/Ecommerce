// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import DetailsPage from "./pages/DetailsPage"; // ✅ Correct file name here
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// ✅ Utility function to safely get user from localStorage
function getStoredUser() {
  try {
    const stored = localStorage.getItem("user");
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Invalid user in localStorage:", err);
    localStorage.removeItem("user");
    return null;
  }
}

function App() {
  const [user, setUser] = useState(getStoredUser);

  // ✅ Listen for user data changes in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = getStoredUser();
      setUser(updatedUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar user={user} setUser={setUser} />

        <div style={{ flex: "1" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/details/:id" element={<DetailsPage />} /> {/* ✅ Updated route */}

            {/* Auth Routes */}
            <Route
              path="/login"
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>

        {/* Footer */}
        <footer
          style={{
            background: "#222",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
          }}
        >
          Shopping Cart 2025–2026, All Rights Reserved
        </footer>
      </div>
    </Router>
  );
}

export default App;

