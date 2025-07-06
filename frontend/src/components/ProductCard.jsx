import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product, page }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const userData = localStorage.getItem("user");
    if (!userData || userData === "undefined") {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    addToCart(product);
    alert(`${product.name} added to cart`);
  };

  const handleBuyNow = async () => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser || rawUser === "undefined") {
      alert("Please login to place order.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(rawUser);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            name: user.username,
            email: user.email,
            mobile: user.mobile,
            age: user.age,
            address: user.address,
          },
          product: {
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Order placed successfully!");
      } else {
        alert("❌ Order failed: " + data.error);
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const handleViewDetails = () => {
    navigate(`/details/${product.id}?page=${page}`);
  };

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.price}>₹{product.price}</p>
      <p>⭐ {product.rating}</p>
      <div style={styles.buttons}>
        <button onClick={handleAddToCart} style={styles.addToCart}>
          Add to Cart
        </button>
        <button onClick={handleBuyNow} style={styles.buyNow}>
          Buy Now
        </button>
        <button onClick={handleViewDetails} style={styles.viewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "220px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  name: { fontSize: "16px", marginBottom: "5px" },
  price: { margin: "5px 0", fontWeight: "bold" },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "10px",
  },
  addToCart: {
    padding: "8px",
    backgroundColor: "#ffd814",
    color: "#000",
    border: "1px solid #a88734",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  buyNow: {
    padding: "8px",
    backgroundColor: "#fb641b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  viewDetails: {
    padding: "8px",
    backgroundColor: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ProductCard;
