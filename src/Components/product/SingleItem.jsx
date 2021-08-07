import React from 'react';
import { connect } from "react-redux";
function SingleItem(props) {
  let productObj = props.currItem;
    return (
        <div
            key={productObj.id}
            style={{ width: "20rem", display: "flex", flexDirection: "column" }}
          >
            <img src={productObj.image} style={{ height: "10rem" }} alt={productObj.title}/>
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
            <button onClick={() => props.addItemToCart(productObj)}>Add to Cart</button>
            </div>
          </div>
    )
}
const mapStateToProps = store => {
    return store;
}
const mapDispatchToProps = (dispatch) => {
  return {

    addItemToCart: (item) => dispatch({type: "AddToCart", payload: item})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
