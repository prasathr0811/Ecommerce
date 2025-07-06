import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const syncUser = () => {
      const raw = localStorage.getItem("user");
      const parsed = raw && raw !== "undefined" ? JSON.parse(raw) : null;
      setUser(parsed);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/?search=${search.trim()}`);
      setSearch("");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        window.dispatchEvent(new Event("storage"));
        setShowLogin(false);
        setLoginUsername("");
        setLoginPassword("");
        alert("✅ Login successful");
        navigate("/profile"); // 👈 go to profile after login
      } else {
        alert("❌ Login failed: " + data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const handleCartClick = () => {
    if (!user) {
      alert("Please login to access the cart.");
      setShowLogin(true);
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <img src="/logo.jpg" alt="Logo" style={styles.logo} />
          <Link to="/" style={styles.brandText}>Shopping Cart</Link>
        </div>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.searchButton}>Search</button>
        </div>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>

          <button onClick={handleCartClick} style={{ ...styles.link, background: "transparent", border: "none", cursor: "pointer" }}>
            Cart {user && cart.length > 0 && <span style={styles.badge}>{cart.length}</span>}
          </button>

          {user ? (
            <>
              <Link to="/profile" style={styles.link}>👤 {user.username}</Link>
              <button onClick={handleLogout} style={styles.logout}>Logout</button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} style={styles.signup}>Signup</button>
          )}
        </div>
      </nav>

      {showLogin && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              style={styles.modalInput}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={styles.modalInput}
            />
            <button onClick={handleLogin} style={styles.modalButton}>Login</button>
            <p style={{ textAlign: "center" }}>
              New user?{" "}
              <Link
                to="/register"
                onClick={() => {
                  setShowLogin(false);
                  setLoginUsername("");
                  setLoginPassword("");
                }}
              >
                Register here
              </Link>
            </p>
            <button
              onClick={() => {
                setShowLogin(false);
                setLoginUsername("");
                setLoginPassword("");
              }}
              style={styles.closeBtn}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  navbar: {
    background: "#222",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "35px",
    height: "35px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  brandText: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
  input: {
    padding: "8px 12px",
    width: "300px",
    borderRadius: "20px 0 0 20px",
    border: "1px solid #ccc",
  },
  searchButton: {
    padding: "9px 20px",
    borderRadius: "0 20px 20px 0",
    background: "#f90",
    color: "#000",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    position: "relative",
  },
  badge: {
    background: "#f90",
    color: "#000",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    position: "absolute",
    top: "-8px",
    right: "-10px",
    fontWeight: "bold",
  },
  signup: {
    background: "#f90",
    color: "#000",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logout: {
    background: "#f90",
    color: "#000",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    position: "relative",
  },
  modalInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  modalButton: {
    width: "100%",
    padding: "10px",
    background: "#f90",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default Navbar;
