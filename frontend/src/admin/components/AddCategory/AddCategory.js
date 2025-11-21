import { useState } from "react";
import "../../css/AddCategory/AddCategory.css";

const ProductsAdmin = () => {
    return (
        <div className="products-container">
            {/* BÊN TRÁI: danh sách sản phẩm */}
            <div className="products-left">
                <h3>Danh sách danh mục</h3>
                <ul>
                    <li>danh mục A</li>
                    <li>danh mục B</li>
                    <li>danh mục C</li>
                </ul>
            </div>

            {/* BÊN PHẢI: form thêm sản phẩm */}
            <div className="products-right">
                <h3>Thêm sản danh mục</h3>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Tiêu đề</label>
                        <input type="text" className="form-control createProducts-input" placeholder="Nhập tiêu đề..." />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <textarea className="form-control createProducts-input" rows="3" placeholder="Nhập mô tả..."></textarea>
                    </div>

                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="form-label">Giá</label>
                            <input type="number" className="form-control createProducts-input" placeholder="Giá gốc" />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label">Giảm giá (%)</label>
                            <input type="number" className="form-control createProducts-input" placeholder="Giảm giá" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Số lượng</label>
                        <input type="number" className="form-control createProducts-input" placeholder="Nhập số lượng" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ảnh (URL)</label>
                        <input type="url" className="form-control createProducts-input" placeholder="Dán link ảnh vào đây..." />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Vị trí</label>
                        <input type="number" className="form-control createProducts-input" placeholder="Nhập vị trí hiển thị" />
                    </div>

                    <button type="submit" className="btn createProducts-btn">Tạo mới</button>
                </form>
            </div>
        </div>
    );
};

export default ProductsAdmin;
