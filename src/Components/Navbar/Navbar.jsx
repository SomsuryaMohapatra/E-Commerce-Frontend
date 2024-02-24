import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../Assets/logo.png";
import cart_icon from "../../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_drop_down from "../../Assets/nav_drop_down.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const [menuUnderline, setMenuUnderline] = useState("");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const menuDropDownToggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="shopper logo" />
        <p>SHOPPER</p>
      </div>
      <img
        className="nav-dropdown"
        src={nav_drop_down}
        alt="menu drop down"
        onClick={menuDropDownToggle}
      />
      <ul ref={menuRef} className="nav-menu">
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
        {localStorage.getItem("token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="shopper cart icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
