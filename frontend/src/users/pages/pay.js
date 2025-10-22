import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import image from "../../image/techcombank.jpg"
import image2 from "../../image/bidv.jpg"
import "../css/pages/pay.css";
import cartControl from "../control/cart.control";
import PdfPay from "../control/payPdf.control";
import Loading from "../helps/Loading";

function Pays() {
//    const {clickOrder, setPDF,PDF} = PdfPay();

    const [PDF, setPDF] = useState(false);
    
    const [loading, setLoading] = useState(false);

    const clickOrder = () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
             
            }, 3000);
        
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Đã copy số tài khoản: " + text);
    };

    // State để quản lý việc hiển thị thông tin ngân hàng và mã QR
    const [showBank, setShowBank] = useState(false);
    const [showSwapBank, setSwapBank] = useState(false);
    // Lấy dữ liệu giỏ hàng và tổng tiền từ location state
    const location = useLocation();
    const { cart, total } = location.state || {};
    // console.log("Cart data in Pay component:", cart);
    // console.log("Total amount in Pay component:", total);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };



    return (
        <div className="card-content main-content col-xl-8 col-lg-9 col-md-9 col-sm-12 col-12">
            <div
                className="position-fixed bottom-0 right-0 p-3"
                style={{
                    left: 0,
                    height:"100%",
                    width: "100%",
                    background: "rgba(128, 128, 128, 0.5)", // xám trong suốt 50%
                    zIndex: 1050,
                    display: loading ? "block" : "none",
                    textAlign: "center",
                    pointerEvents: loading ? "auto" : "none" 
                }}
            >
                {loading && <Loading />}
            </div>
            
            <div className="cart-items">
                <h1>Giỏ hàng của bạn</h1>
                {cart.map(item => (
                    <div className="cart-item" key={item.id}>

                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="item-price">{formatCurrency(item.price)}</p>
                        </div>
                        <div className="item-quantity">
                            <input type="number" value={item.quantity} readOnly />
                        </div>
                        <p className="item-total">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h2>Thanh Toán đơn hàng</h2>
                <div className="coupon-code">
                    {showSwapBank ? (
                        <img src={image} className="Qr-image" />
                    ) : (
                        <img src={image2} className="Qr-image" />
                    )}


                </div>
                <div>
                    {showBank && (
                        <section className="bank-details">
                            <p>Ngân hàng: Techcombank</p>
                            <p>Số tài khoản: 3005898989</p>
                            <button
                                className="copy-btn"
                                onClick={() => copyToClipboard("3005898989")}
                            >
                                Copy
                            </button>
                            <p>Chủ tài khoản: Lương Việt Nhật</p>
                        </section>
                    )}
                </div>
                <div className="summary-row total-row">
                    <span>Tổng cộng</span>
                    <span>{formatCurrency(total)}</span>
                </div>
                <button
                    className="checkout-btn"
                    onClick={() => {
                        clickOrder();
                            setTimeout(() => {
                                window.location.href = '/doneOrder';
                            }, 3000);
                    }}
                    disabled={loading}
                >
                    Xác nhận thanh toán
                </button>
                
               


            </div>

            <div className="cart-summary">
                <h2>Yêu cầu</h2>

                <div className="require-item">
                    <span>Hiện STK Và Chủ TK</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={showBank}
                            onChange={() => setShowBank(!showBank)}
                        />
                        <span className="slider round"></span>
                    </label>

                </div>
                <div className="require-item">
                    <span>Thanh Toán Bằng Ví</span>
                    <label className="switch">
                        <input type="checkbox"
                            checked={showSwapBank}
                            onChange={() => setSwapBank(!showSwapBank)} />
                        <span className="slider round"></span>
                    </label>
                </div>

                {/* Hóa đơn PDF */}
                <div className="require-item">
                    <span>In hóa đơn PDF</span>
                    <label className="switch">
                        <input type="checkbox"
                            checked={PDF}
                            onClick={() => setPDF(!PDF)} />
                        <span className="slider round"></span>
                    </label>
                </div>

                {/* Hóa đơn giấy */}
                <div className="require-item">
                    <span>In hóa đơn giấy</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>


        </div>
    );
}

export default Pays;
