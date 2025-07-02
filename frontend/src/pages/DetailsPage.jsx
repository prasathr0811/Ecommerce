import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function DetailsPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));
  const productId = parseInt(id);
  const page = searchParams.get("page") || 1;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p style={{ padding: "20px" }}>⚠️ Product not found.</p>;
  }

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    addToCart(product);
    alert(`${product.name} added to cart.`);
  };

  const handleBuyNow = async () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/order", {
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
    } catch (error) {
      console.error("Order error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const handleBack = () => {
    navigate(`/?page=${page}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleBack} style={{ marginBottom: "20px" }}>
        ← Back to Page {page}
      </button>

      <div style={{ display: "flex", gap: "40px", alignItems: "start" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        />

        <div>
          <h2>{product.name}</h2>
          <p><b>Price:</b> ₹{product.price}</p>
          <p><b>Rating:</b> ⭐ {product.rating}</p>

          {product.ram && <p><b>RAM:</b> {product.ram}</p>}
          {product.storage && <p><b>Storage:</b> {product.storage}</p>}

          <p><b>Description:</b> {product.description}</p>

          {product.features?.length > 0 && (
            <>
              <p><b>Features:</b></p>
              <ul>
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}

          <button onClick={handleAddToCart} style={{ marginRight: "10px" }}>
            Add to Cart
          </button>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
