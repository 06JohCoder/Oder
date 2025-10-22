import React, { useState } from 'react';
import "../css/pages/doneOrder.css";

// Dữ liệu mẫu cho các đơn hàng đã hoàn thành
const mockOrders = [

    {
        id: 'DH001',
        date: '20/09/2025',
        totalAmount: 550000,
        status: 'Đã đặt thành công',
        local: "001",
        products: [
            { name: 'Pizza Hải Sản', quantity: 1, price: 250000 },
            { name: 'Mì Ý Sốt Bò Bằm', quantity: 2, price: 150000 },
        ]
    },
    {
        id: 'DH002',
        date: '15/09/2025',
        totalAmount: 320000,
        status: 'Đã đặt thành công',
        local: "002",
        products: [
            { name: 'Salad Цезарь', quantity: 1, price: 120000 },
            { name: 'Nước ép cam', quantity: 2, price: 100000 },
        ],
        request: [
            { content: 'In hóa đơn giấy' },
            { content: 'Nước cola không đá' },
        ]
    },
    {
        id: 'DH003',
        date: '01/09/2025',
        totalAmount: 890000,
        status: 'Đã hủy',
        products: [
            { name: 'Steak Bò Mỹ', quantity: 2, price: 445000 },
        ]
    }
];


function DoneOrder() {
    // State để theo dõi xem đơn hàng nào đang được mở chi tiết
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    // Thông báo sau khi dowload hóa đơn

    // Hàm không cho phép hủy đơn khi đã dowload hóa đơn
    const [noDowloadBill, setNoDowBill] = useState(false)

    const [dowBill, setDowBill] = useState(false)
    // Hàm để bật/tắt chi tiết đơn hàng
    const alertBillDrder = () => {
        setDowBill(true)
        setNoDowBill(true)
        setTimeout(() => {
            setDowBill(false);

        }, 3000);
    }

    const handleToggleDetails = (orderId) => {

        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
        } else {
            setExpandedOrderId(orderId);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="main-doneOrder">


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <div class="alerts_dowload alert alert-primary d-flex align-items-center" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>

                                <svg id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>

                                <div>
                                    Chú ý khi hủy hàng
                                </div>
                            </div>
                        </div>

                        <button type="button" class="btn-close btn-closeDowload" data-bs-dismiss="modal" aria-label="Close"></button>

                        <div class="modal-body">
                            1. Khi Dowload Hóa Đơn Bạn Không Thể Hủy Đơn hàng <br />
                            2. Khi Hủy Đơn Bạn Không Thể Tải Hóa Đơn

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                            <button type="button" class="btn btn-primary" onClick={alertBillDrder} data-bs-dismiss="modal">Đã Hiểu</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
                <div>
                    An example danger alert with an icon
                </div>
            </div>
            {dowBill && (
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Tải Thành Công!</h4>
                    <p>Bạn đã tải thành công hóa đơn .</p>
                    <hr />
                    <p class="mb-0">Chúc bạn có một nửa ăn vui vẽ.</p>
                </div>
            )}


            <h1 className="page-title">Lịch sử đơn hàng</h1>
            <div className="order-list">
                {mockOrders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-summary">
                            <div className="order-info">
                                <p><strong>Mã đơn:</strong> {order.id}</p>
                                <p><strong>Ngày đặt:</strong> {order.date}</p>
                                <p><strong>Tổng tiền:</strong> {formatCurrency(order.totalAmount)}</p>
                                <p><strong>Bàn Ăn:</strong> {order.local}</p>

                            </div>
                            <div className="order-status">

                                <span className={`status ${order.status === 'Đã đặt thành công' ? 'status-success' : 'status-cancelled'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="order-actions">
                                <button className="btn-details" onClick={() => handleToggleDetails(order.id)}>
                                    {expandedOrderId === order.id ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                                </button>
                                {(order.status === 'Đã đặt thành công' && noDowloadBill == false) ? (
                                    <>
                                        <button className="btn-download" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">Tải hóa đơn</button>
                                        <button className="btn-download" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button"> Hủy Đơn </button>
                                    </>
                                ) : (
                                    <button className="btn-download"> Đặt Lại Đơn</button>
                                )}


                            </div>
                        </div>
                        {expandedOrderId === order.id && (
                            <div className="order-details">
                                <h5>Chi tiết sản phẩm:</h5>
                                <ul className="product-list">
                                    {order.products.map((product, index) => (
                                        <li key={index} className="product-item">
                                            <span>{product.name} (x{product.quantity})</span>
                                            <span>{formatCurrency(product.price)}</span>

                                        </li>
                                    ))}
                                </ul>
                                <br />
                                <h5>Yêu cầu Của khách hàng:</h5>
                                <ul className='product-list'>
                                    {order.request ? (
                                        order.request.map((res, index) => (
                                            <li key={index} className="product-item">
                                                <span>{res.content}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="product-item">
                                            <span>Không có yêu cầu đặc biệt</span>
                                        </li>
                                    )}
                                </ul>

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoneOrder;