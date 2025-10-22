import { Link } from "react-router-dom";
import "../css/pages/cart.css";
import { useState,useEffect } from "react";
import Pays from "./pay";
import cartControl from "../control/cart.control";



function Cart() {
    const {cart,handleClick,formatCurrency,shippingFee,sum} = cartControl();
    
    
    
    return (
        <div className="card-content main-content col-xl-8 col-lg-9 col-md-9 col-sm-12 col-12">
             <div className="cart-items">
                    <h1>Giỏ hàng của bạn</h1>
                    {cart.map(item => (
                        <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="item-price">{formatCurrency(item.price)}</p>
                        </div>
                        <div className="item-quantity">
                            <button onClick={() => handleClick("minus", item.id)} className="btn-quantity">-</button>
                            <input type="number" value={item.quantity} readOnly />
                            <button onClick={() => handleClick("plus", item.id)} className="btn-quantity">+</button>
                        </div>
                        <p className="item-total">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                    ))}
             </div>
    


            <div className="cart-summary">
                <h2>Tóm tắt đơn hàng</h2>
                <div className="summary-row">
                    <span>Tạm tính</span>
                    {/* <span>{formatCurrency(subtotal)}</span> */}
                    <span>{formatCurrency(sum)}</span>
                </div>
                <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <span>{formatCurrency(shippingFee)}</span>
                </div>
                <div className="coupon-code">
                    <input type="text" placeholder="Nhập mã giảm giá" />
                    
                </div>
                <div className="summary-row total-row">
                    <span>Tổng cộng</span>
                    <span>{formatCurrency(sum)}</span>
                </div>
                <Link 
                    to={"/cart/pay"} style={{ color: 'white', textDecoration: 'none' }}
                    state={{ cart: cart, total: sum }}
                    >
                <button className="checkout-btn" >
                  
                    Tiến Hành Thanh Toán
                   
                </button>
                 </Link>
            </div>
        </div>
    );
}

export default Cart;