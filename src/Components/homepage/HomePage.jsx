import React from "react";
import { connect } from "react-redux";
import {useHistory } from 'react-router';

function HomePage(props) {
  const history = useHistory();
  const handleViewItem = (product) => {
    props.viewItem(product);
    history.push(`/product/${product.id}`);
  };
  return (
    <>
      {props.products.map((productObj) => {
        return (
          <div
            key={productObj.id}
            style={{ width: "20rem", display: "flex", flexDirection: "column" }}
          >
            <img src={productObj.image} style={{ height: "10rem" }} alt={productObj.title} />
            <div>
              <h2>{productObj.title}</h2>
            </div>
            <div>
              <h3>{productObj.price}</h3>
            </div>
            <div>
              <p>{productObj.description}</p>
            </div>
            <div>
              <button onClick={() => handleViewItem(productObj)}>View Item</button>
              <button onClick={() => props.addItemToCart(productObj)}>Add to Cart</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

const mapStateToProps = (store) => {
  return store;
};
const mapDispatchToProps = (dispatch) => {
  return {
    viewItem: (item) => dispatch({type:"ViewItem", payload: item}),
    addItemToCart: (item) => dispatch({type: "AddToCart", payload: item})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
