import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router";

function NavBar({cart}) {
    // let cart = props.cart;
    const history = useHistory();

    const handleGoToCart = () => {
        history.push(`/cart`);
    }
    const [cartCount, setCount] = useState(0);

    useEffect(() => {
        let count = 0;
        cart.forEach((item) => 
            count += item.count);
        setCount(count);

    }, [cart, cartCount])
    return (
        <div style={{backgroundColor:"gray", height:"5rem"}}> 
            <p>Number of items in Cart : {cartCount}</p>
            <button onClick={handleGoToCart}>Go to cart</button>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
      cart: store.cart,
    };
  };
export default connect(mapStateToProps)(NavBar);
