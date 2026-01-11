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






    const [isMinimized, setIsMinimized] = useState(true);
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
                        <div key={p._id} className="card product-card" style={{ cursor: "pointer" }} >
                            <img src={p.img} alt={p.name} />
                            <h3>{p.name}</h3>
                            <p>{p.price.toLocaleString()} đ</p>
                            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                                <button class="btn btn-primary" data-add={p._id} onClick={() => addToCart(p)}>Thêm</button>
                                <button class="btn btn-primary secondary" data-buy={p._id}>Mua ngay</button>
                            </div>



                        </div>

                    ))}

                </div>

                <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
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