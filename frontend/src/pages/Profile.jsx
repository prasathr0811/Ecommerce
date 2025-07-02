import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  // ✅ Load user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") {
        throw new Error("Invalid user data");
      }

      const parsedUser = JSON.parse(stored);
      if (!parsedUser || !parsedUser._id) {
        throw new Error("User data incomplete");
      }

      setUser(parsedUser);
    } catch (err) {
      console.error("User fetch error:", err);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updated profile
  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok && data.updatedUser) {
        localStorage.setItem("user", JSON.stringify(data.updatedUser));
        setUser(data.updatedUser);
        setEdit(false);
        alert("✅ Profile updated successfully!");
      } else {
        const message = data?.error || "Unknown error from server";
        alert("❌ Failed to update profile: " + message);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Error updating profile.");
    }
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
        alt="Profile"
        style={styles.avatar}
      />
      <h2>Profile</h2>

      <div style={styles.info}>
        <label>Name:</label>
        <input
          disabled={!edit}
          name="name"
          value={user.name || ""}
          onChange={handleChange}
          style={styles.input}
        />
        <label>Username:</label>
        <input
          disabled={!edit}
          name="username"
          value={user.username || ""}
          onChange={handleChange}
          style={styles.input}
        />
        <label>Email:</label>
        <input
          disabled={!edit}
          name="email"
          type="email"
          value={user.email || ""}
          onChange={handleChange}
          style={styles.input}
        />
        <label>Mobile:</label>
        <input
          disabled={!edit}
          name="mobile"
          value={user.mobile || ""}
          onChange={handleChange}
          style={styles.input}
        />
        <label>Age:</label>
        <input
          disabled={!edit}
          name="age"
          value={user.age || ""}
          onChange={handleChange}
          style={styles.input}
        />
        <label>Address:</label>
        <textarea
          disabled={!edit}
          name="address"
          value={user.address || ""}
          onChange={handleChange}
          rows={2}
          style={styles.input}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        {edit ? (
          <button onClick={handleSave} style={styles.button}>Save</button>
        ) : (
          <button onClick={() => setEdit(true)} style={styles.button}>Edit</button>
        )}
        <button
          onClick={handleLogout}
          style={{ ...styles.button, marginLeft: "10px", background: "#e53935", color: "#fff" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: "80px",
    borderRadius: "50%",
    marginBottom: "15px",
  },
  info: {
    textAlign: "left",
    marginTop: "20px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#f90",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Profile;
