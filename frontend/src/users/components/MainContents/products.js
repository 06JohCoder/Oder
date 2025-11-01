import '../../css/MainContent/products.css'
import '../../css/MainContent/cartMiniProducts.css'
import '../../css/effects.css'
import { useState, useEffect } from 'react';
function Products() {



    const [productsData, SetproductsData] = useState([]);
    useEffect(() => {
        // Gọi API từ backend
        fetch("/api/products")
            .then(res => res.json())
            .then(data => SetproductsData(data))
            .catch(err => SetproductsData("Lỗi kết nối với backend"));
    }, []);

    // console.log(productsData)

    const [cart, setCart] = useState([]);

    // console.log("cart ở đây", cart);
    const [showModal, setShowModal] = useState(false);
    const [idModal, setIdModal] = useState(null);

    const openModal = (p) => {
        setShowModal(true)
        setIdModal(p)
    };
    // console.log("idModal", idModal);
    const closeModal = () => setShowModal(false);

    const addToCart = (product) => {
        // console.log("product-cart", product.id);

        const checkAdd = cart.find((item) => item._id === product._id);

        if (!checkAdd) {
            setCart([
                ...cart,
                { ...product, quantity: 1 }
            ]);
        } else {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );

        }
    };
    // console.log(cart)

    const sumProducts = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    //  Xóa sản phẩm khỏi giỏ
    const onclickClose = (_id) => {
        setCart(cart.filter((item) => item._id !== _id));
    };

    // Tăng số lượng
    const onclickAddi = (_id) => {
        setCart(
            cart.map((item) =>
                item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    //  Giảm số lượng (nếu còn > 1 thì giảm, nếu =1 thì xóa luôn)
    const onclickSubt = (_id) => {
        setCart(
            cart.map((item) =>
                item._id === _id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter((item) => item.quantity > 0)
        );
    };






    const [isMinimized, setIsMinimized] = useState(false);
    // code phần di chuyển giỏ hàng
    useEffect(() => {
        const draggableDiv = document.getElementById("draggable-div");
        if (!draggableDiv) return;

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const handleMouseDown = (e) => {
            isDragging = true;
            draggableDiv.style.cursor = "grabbing";
            offsetX = e.clientX - draggableDiv.offsetLeft;
            offsetY = e.clientY - draggableDiv.offsetTop;
        };

        const handleMouseUp = () => {
            isDragging = false;
            draggableDiv.style.cursor = "grab";
        };

        const handleMouseMove = (e) => {
            if (isDragging) {
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;

                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const divWidth = draggableDiv.offsetWidth;
                const divHeight = draggableDiv.offsetHeight;

                if (newX < 0) newX = 0;
                if (newY < 0) newY = 0;
                if (newX + divWidth > viewportWidth) newX = viewportWidth - divWidth;
                if (newY + divHeight > viewportHeight) newY = viewportHeight - divHeight;

                draggableDiv.style.left = newX + "px";
                draggableDiv.style.top = newY + "px";
            }
        };

        draggableDiv.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);

        // Dọn dẹp khi component bị hủy (quan trọng!)
        return () => {
            draggableDiv.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isMinimized]);



    // close bõ cart


    const closeCart = (() => {
        setIsMinimized(true)
    })
    const openCart = (() => {
        setIsMinimized(false)
    })
    return (
        <>
            <section class="food-filter">
                <div class="filter-container">
                    <div><button class="active">Tất cả</button></div>
                    <div><button>Lẩu</button></div>
                    <div><button>Đồ nướng</button></div>
                    <div><button>Nước uống</button></div>
                    <div><button>Đồ ăn vặt</button></div>


                </div>
            </section>

            <section>

                <div className="products" id="products">
                    {productsData.map((p) => (
                        <div key={p._id} className="card product-card"  >
                            <img src={p.img} alt={p.name} onClick={() => openModal(p)} style={{ cursor: "pointer" }} />
                            <h3>{p.name}</h3>
                            <p>{p.price.toLocaleString()} đ</p>
                            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                                <button class="btn btn-primary" data-add={p._id} onClick={() => addToCart(p)}>Thêm</button>
                                <button class="btn btn-primary secondary" data-buy={p._id}>Mua ngay</button>
                            </div>



                        </div>




                    ))}
                </div>

                <div
                    id="myShowModal"
                    className={` showModal ${showModal ? "is-active" : ""}`}
                    // onClick={closeModal}
                >
                    <div className="showModal-content">


                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            left: '0',
                            position: 'absolute',
                            height: '100%',
                            width: '60%',
                            background: '#e6cea4'
                        }}>
                            {idModal && <img src={idModal.img} alt="Product" />}

                        </div>
                        <div
                            style={{
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                                width: "40%",
                                height: "100%",
                                backgroundColor: "#fff",
                                borderRadius: "0",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                overflow: "hidden",
                                fontFamily: "sans-serif",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* Header */}
                            <div
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    padding: "10px",
                                    textAlign: "center",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    flexShrink: 0,
                                }}
                            >
                                💬 Chat Với Nhà Hàng
                            </div>

                            {/* Vùng tin nhắn (tự kéo dài) */}
                            <div
                                style={{
                                    flex: 1,
                                    overflowY: "auto",
                                    padding: "15px",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <div style={{ marginBottom: "10px" }}>
                                    <strong>Admin:</strong> Xin chào! Bạn cần hỗ trợ món nào ạ?
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <strong>Bạn:</strong> Cho mình hỏi còn cơm gà không?
                                </div>
                            </div>

                            {/* Ô nhập tin nhắn (dính đáy) */}
                            <div
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "10px",
                                    backgroundColor: "#fff",
                                    flexShrink: 0,
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                }}
                            >
                                <textarea
                                    placeholder="Nhập tin nhắn..."
                                    style={{
                                        flex: 1,
                                        height: "50px",
                                        resize: "none",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                ></textarea>

                                <button
                                    style={{
                                        backgroundColor: "#007bff",
                                        color: "#fff",
                                        border: "none",
                                        padding: "10px 16px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "500",
                                        transition: "0.2s",
                                    }}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                                >
                                    Gửi
                                </button>
                            </div>
                        </div>


                        <button className="showModal-close" onClick={closeModal}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>




            </section >


            {!isMinimized && (
                <aside class="cart" id="draggable-div">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <a style={{ fontSize: "1.3rem" }}>
                            <i className="bi bi-basket food-icon-sidebar-left"></i> Giỏ hàng
                        </a>
                        <button className="button-MinimClose" title="Minimize" style={{ color: '000000', fontSize: '15px', borderRadius: '20px', background: 'antiquewhite' }} onClick={closeCart}>
                            <i className="bi bi-dash-lg"></i>
                        </button>
                    </div>


                    <div className="cart-list" id="cartList">
                        {cart.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div style={{
                                    display: "grid"
                                }}>
                                    <span className="small">{item.name}</span>
                                    <span> x{item.quantity}</span>
                                </div>
                                <div>
                                    <span>{(item.price * item.quantity).toLocaleString()} đ</span>
                                    <div className="cart-actions">
                                        <button className="small-btn" data-dec={item._id} onClick={() => { onclickSubt(item._id) }}>-</button>
                                        <button className="small-btn" data-inc={item._id} onClick={() => { onclickAddi(item._id) }}>+</button>
                                        <button className="small-btn" data-rem={item._id} onClick={() => { onclickClose(item._id) }}>x</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div class="small">Tổng tiền: <strong id="totalText">{sumProducts.toLocaleString()}đ</strong></div>
                    <div class="small">Giảm giá: <strong id="discountText">0₫</strong></div>

                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <button className="btn btn-primary" id="proceedSmall">
                            Kiểm tra & Thanh toán
                        </button>
                    </div>

                </aside>
            )
            }



            {
                isMinimized && (
                    <aside className="iconCart" onClick={openCart}>
                        <i className="bi bi-basket" style={{ fontSize: "2rem" }}></i>
                    </aside>
                )
            }
        </>
    )
}
export default Products