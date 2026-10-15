import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount, clearCart } = useCart();

  const handleLogout = async () => {
    try {
      await API.post("/customers/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearCart();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home" className="navbar-logo">
          🛒 ShopKart
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/wishlist" className="nav-link">
          ❤️ Wishlist
        </Link>
        <Link to="/cart" className="nav-link nav-link-cart">
          🛒 Cart{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <Link to="/orders" className="nav-link">
          📦 Orders
        </Link>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
