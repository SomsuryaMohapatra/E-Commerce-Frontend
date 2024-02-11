import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../Assets/logo.png";
import cart_icon from "../../Assets/cart_icon.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [menuUnderline, setMenuUnderline] = useState("");
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="shopper logo" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenuUnderline("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>{" "}
          {menuUnderline === "shop" ? <hr /> : ""}{" "}
        </li>
        <li onClick={() => setMenuUnderline("men")}>
          <Link style={{ textDecoration: "none" }} to="/men">
            Men
          </Link>{" "}
          {menuUnderline === "men" ? <hr /> : ""}{" "}
        </li>
        <li onClick={() => setMenuUnderline("women")}>
          <Link style={{ textDecoration: "none" }} to="/women">
            Women
          </Link>{" "}
          {menuUnderline === "women" ? <hr /> : ""}{" "}
        </li>
        <li onClick={() => setMenuUnderline("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>{" "}
          {menuUnderline === "kids" ? <hr /> : ""}{" "}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="shopper cart icon" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
