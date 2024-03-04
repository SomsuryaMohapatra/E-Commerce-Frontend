import React from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";

const RelatedProducts = () => {
  const { productId } = useParams();
  const { all_product, newCollections } = useContext(ShopContext);
  let curentProduct = all_product.find((e) => e.id === Number(productId));
  if (!curentProduct) {
    curentProduct = newCollections.find((e) => e.id === Number(productId));
  }
  let currentProductCategory = curentProduct.category;
  let allRelatedProducts = all_product.filter(
    (e) => e.category === currentProductCategory
  );
  let relatedProducts = allRelatedProducts.slice(-4);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
