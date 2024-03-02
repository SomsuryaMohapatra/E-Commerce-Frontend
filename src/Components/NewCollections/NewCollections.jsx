import React, { useState, useEffect } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);
  // let newCollectionStatus = "";

  const fetchNewCollections = () => {
    fetch("http://localhost:4000/api/newcollections")
      .then((res) => res.json())
      .then((resData) => {
        setNewCollections(resData.new_collections_products);
        // newCollectionStatus = resData.success;
        // console.log(newCollectionStatus);
      });
  };

  useEffect(() => {
    fetchNewCollections();
  }, []);

  return (
    <>
      <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
          {Array.isArray(newCollections) &&
            newCollections.map((item) => (
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
    </>
  );
};

export default NewCollections;
