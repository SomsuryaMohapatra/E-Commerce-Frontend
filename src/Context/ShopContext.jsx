import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_product, setAll_Product] = useState([]);
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/allproducts")
      .then((res) => res.json())
      .then((resData) => {
        setAll_Product(resData.products);
      });

    fetch("http://localhost:4000/api/newcollections")
      .then((res) => res.json())
      .then((resData) => setNewCollections(resData.new_collections_products));

    if (localStorage.getItem("token")) {
      fetch("http://localhost:4000/api/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    fetch("http://localhost:4000/api/addtocart", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        token: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: itemId }),
    })
      .then((res) => res.json())
      .then((resData) => console.log(resData));
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("token")) {
      fetch("http://localhost:4000/api/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((resData) => console.log(resData));
    }
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   let items = Object.keys(cartItems);
  //   items.forEach((item) => {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = all_product.find(
  //         (product) => product.id === Number(item)
  //         );
  //       totalAmount += itemInfo.new_price * cartItems[item];
  //       console.log(totalAmount);
  //     }
  //   });
  //   return totalAmount;
  // };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    all_product,
    newCollections,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
