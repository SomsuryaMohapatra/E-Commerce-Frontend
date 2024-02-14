import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Shopper presents a jacket designed to elevate your wardrobe and
          withstand the elements with effortless grace. Crafted with precision
          and passion, this jacket is a fusion of contemporary aesthetics and
          cutting-edge technology.
        </p>
        <p>
          Whether you're conquering city streets or exploring the great
          outdoors, this jacket is your versatile companion. Its timeless design
          effortlessly complements any outfit, making it a wardrobe essential
          for those who demand both style and substance. Choose from a palette
          of sophisticated colors, ranging from classic neutrals to bold
          statement hues. Find the shade that resonates with your personality
          and style.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
