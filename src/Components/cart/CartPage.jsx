import React,{useState, useEffect} from 'react';
import {connect} from "react-redux";
import CartItem from './CartItem';
import {coupons} from '../../data/data'
function Cart(props) {
    let cart = props.cart;
    
    const [totalItem, setTotalItem] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [coupon, setCoupon] = useState("");

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [oldPrice, setOldPrice] = useState(null);
    // 1
    useEffect(() => {
        setLoading(true);
        let price = 0;
        let count = 0;
        cart.forEach((item) => {
            price += (item.price * item.count);
            count += item.count
        })
        setTotalItem(count);
        setTotalPrice(price);
    }, [cart])
    // 2
    const getText = (e) => {
        setCoupon(e.target.value);
    }
    // 3
    const ApplyCouopn = () => {
        let couponm = coupon.trim().toUpperCase();
        couponm = coupons[couponm];
        if (couponm === undefined) {
            setLoading(false);
            setSuccess(false);
        }
        else{
            setLoading(false);
            setSuccess(true);
            let discount = (totalPrice/100)*(couponm.discount);
            let newPrice = Number(totalPrice) - Number(discount);
            setOldPrice(totalPrice);
            setTotalPrice(newPrice);
        }
        console.log("Coupon Applied SuccessFully")
    }
    // 4 
    const RevertCoupon = () => {
        setTotalPrice(oldPrice);
        setOldPrice(null);
        setSuccess(null);
        setLoading(true);
        setCoupon("");
    }
    
    const TryAgain = () => {
        setLoading(true);
        setSuccess(null);
        setCoupon("");
    }
    return (
        <>
        {
            cart.length === 0? <div>Your Cart is empty</div>:
            cart.map((item)=>{
                return (<CartItem key={item.id} item={item} />)
            })
        }
        <div>
        <p>
            Total Item : {totalItem}
        </p>
        <p>
            Total Price : {totalPrice}
        </p>
        </div>
        
        <div>
            {loading === true 
                ?
                    <div className="apply-coupon">
                        <input type="text" value={coupon} onChange={getText} placeholder={"Enter coupon"}/>
                        <button onClick={()=> {ApplyCouopn(); setCoupon("")}}>Apply Coupon</button>
                    </div>
                : success === true 
                    ?
                        <div className="smsg">
                            <h1>Coupon Applied Successfully!</h1>
                            <div className="revert">
                                <button onClick={RevertCoupon}>Revert</button>
                            </div>
                        </div>
                    :   
                        <div className="fmsg">
                            <h4>Not a valid Coupon!</h4>
                            <div className="revert">
                                <button onClick={TryAgain}>Try-Again</button>
                            </div>
                        </div>
            }
        </div>
        </>
    )
}
const mapStateToProps = (store)  => {
    return store;
}
export default connect(mapStateToProps)(Cart);
