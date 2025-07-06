import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleBuyNow = async (item) => {
    if (!user) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            name: user.username,
            email: user.email,
            mobile: user.mobile,
            age: user.age,
            address: user.address,
          },
          product: {
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Order placed for ${item.name}`);
        removeFromCart(item.id); // remove only this item
      } else {
        alert("❌ Order failed: " + data.error);
      }
    } catch (err) {
      console.error("❌ Order error:", err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  marginRight: "20px",
                }}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Rating: ⭐ {item.rating}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
                <p>
                  <b>Total:</b> ₹{item.price * item.quantity}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleBuyNow(item)}
                    style={{
                      marginRight: "10px",
                      background: "#fb641b",
                      color: "#fff",
                      padding: "8px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "red",
                      color: "#fff",
                      padding: "8px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <h3>🧾 Grand Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
}

export default CartPage;
