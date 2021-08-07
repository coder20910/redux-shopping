import React, {useState} from 'react';
import {connect} from "react-redux";

function CartItem({item, adjustItemQty, deleteFromCart}) {
    
    const [itemCount, setInput] = useState(item.count);
    
    const handleInput = (e) => {
        if(e.target.value > 0){
            setInput(e.target.value);
            adjustItemQty(item.id, e.target.value);
        }
    }
    return (
        <div key={item.id}>
            <img src={item.image} style={{height:"10rem"}} alt={item.title} />
            <div>{item.title}</div>
            <div>{item.price}</div>
            <div>{item.description}</div>
            <button onClick={()=> deleteFromCart(item.id)}>Delete</button>
            <input type="number"  min="1" value={itemCount} onChange={handleInput}/>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return  {
        adjustItemQty: (id, count) => dispatch({type:"AdjustQty", payload:{id, count}}),
        deleteFromCart: (id) => dispatch({type:"DeleteItem", payload:{id}})
    }
}
export default connect(null, mapDispatchToProps)(CartItem);
