import { useState } from "react";
import "../../css/creatProduct/CreateProducts.css";

function CreateProducts({ setProducts ,setNotifMessage,setLoading }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discountPercentage: "",
        stock: "",
        img: "",
        position: "",
        status: "active",
        category: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/products/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            // Chuyển response sang JSON
            const data = await res.json();

            if (res.ok) { 
                setNotifMessage(data.message);
                setLoading(true)
                setProducts(prev => [...prev, data.product]); 
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    discountPercentage: "",
                    stock: "",
                    img: "",
                    position: "",
                    status: "active",
                    category: ""
                });
            } else {
                alert("Đã xảy ra lỗi khi tạo sản phẩm.");
            }

        } catch (error) {
            console.error("Error:", error);
        }

    };

    return (
        <div
            className="offcanvas offcanvas-start createProducts-offcanvas"
            tabIndex="-1"
            id="offcanvasWithBackdrop"
            aria-labelledby="offcanvasWithBackdropLabel"
        >
            <div className="offcanvas-header createProducts-header">
                <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
                    Create Product
                </h5>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            <div className="offcanvas-body createProducts-body">
                <form onSubmit={handleSubmit}  enctype="multipart/form-data">
                    {/* Tên sản phẩm */}
                    <div className="mb-3">
                        <label className="form-label">Tiêu đề</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control createProducts-input"
                            placeholder="Nhập tiêu đề..."
                            required
                        />
                    </div>

                    {/* Mô tả */}
                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-control createProducts-input"
                            rows="3"
                            placeholder="Nhập mô tả..."
                        ></textarea>
                    </div>

                    {/* Giá & Giảm giá */}
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label">Giá</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="form-control createProducts-input"
                                placeholder="Giá gốc"
                                required
                                min="1"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label">Giảm giá (%)</label>
                            <input
                                type="number"
                                name="discountPercentage"
                                value={formData.discountPercentage}
                                onChange={handleChange}
                                className="form-control createProducts-input"
                                placeholder="Giảm giá"
                            />
                        </div>
                    </div>

                    {/* Số lượng */}
                    <div className="mb-3">
                        <label className="form-label">Số lượng</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="form-control createProducts-input"
                            placeholder="Nhập số lượng"
                            required
                            min="1"
                        />
                    </div>

                    {/* Ảnh */}
                    <div className="mb-3">
                        <label className="form-label">Ảnh (URL)</label>
                        <input
                            type="url"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            className="form-control createProducts-input"
                            placeholder="Dán link ảnh vào đây..."
                            required
                        />
                         {/* <input type="file" name="avatar" accept="image/*" className="form-control-file" /> */}
                    </div>

                    {/* Vị trí */}
                    <div className="mb-3">
                        <label className="form-label">Vị trí</label>
                        <input
                            type="number"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="form-control createProducts-input"
                            placeholder="Nhập vị trí hiển thị"
                        />
                    </div>

                    {/* Trạng thái */}
                    <div className="mb-3">
                        <label className="form-label">Trạng thái</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={formData.status === "active"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Hoạt động</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={formData.status === "inactive"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Dừng hoạt động</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn createProducts-btn">
                        Tạo mới
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProducts;
