import React from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const user = JSON.parse(localStorage.getItem("user"));

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Product not found!
      </h2>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add to cart.");
      navigate("/login");
      return;
    }
    addToCart(product);
    alert(`${product.name} added to cart.`);
  };

  const handleBuyNow = async () => {
    if (!user) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

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
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Order placed successfully!");
      } else {
        alert("❌ Order failed: " + data.error);
      }
    } catch (err) {
      console.error("Order Error:", err);
      alert("❌ Something went wrong.");
    }
  };

  const handleBack = () => {
    navigate(`/?page=${page}`);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9", minHeight: "80vh" }}>
      <button onClick={handleBack} style={{ marginBottom: "20px" }}>
        ← Back to Page {page}
      </button>

      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
            borderRadius: "8px",
            background: "#f8f8f8",
            padding: "10px",
          }}
        />

        <div style={{ flex: "1", minWidth: "280px" }}>
          <h2>{product.name}</h2>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>₹{product.price}</p>
          <p style={{ fontSize: "16px" }}>⭐ {product.rating}</p>

          {product.ram && <p><strong>RAM:</strong> {product.ram}</p>}
          {product.storage && <p><strong>Storage:</strong> {product.storage}</p>}

          <p style={{ marginTop: "10px", lineHeight: "1.6", color: "#555" }}>
            {product.description}
          </p>

          {product.features && (
            <div style={{ marginTop: "10px" }}>
              <strong>Features:</strong>
              <ul style={{ paddingLeft: "20px", color: "#555" }}>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={handleAddToCart} style={styles.addToCart}>
              Add to Cart
            </button>
            <button onClick={handleBuyNow} style={styles.buyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  addToCart: {
    padding: "10px 15px",
    background: "#ffd814",
    border: "1px solid #a88734",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  buyNow: {
    padding: "10px 15px",
    background: "#fb641b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ProductDetails;
