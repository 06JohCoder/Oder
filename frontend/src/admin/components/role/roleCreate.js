import { useState } from "react";
import "../../css/AddCategory/AddCategory.css";
import { Link } from "react-router-dom";

function RoleCreate() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "active",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const submitFromdata = () => {
        let url = "/api/admin/role/create";
        try {
            fetch(url, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log("data", data);
                    // alert(data.message)
                    if (data.message) {
                        alert(data.message)
                        setFormData({
                            name: "",
                            description: "",
                            status: "active",
                        })
                    }
                })
        } catch (error) {
            console.error("Error:", error);
        }
    }



    // console.log("fromdataa",formData)
    return (
        <>


            <div className="products-container">

                <div className="products-right">

                    <div className="mb-3">
                        <label className="form-label">Tiêu đề</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control createProducts-input"
                            placeholder="Nhập tiêu đề..."
                            value={formData.name}
                            onChange={handleChange}

                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <textarea
                            name="description"
                            className="form-control createProducts-input"
                            placeholder="Nhập mô tả..."
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
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

                                />
                                <label className="form-check-label">
                                    Dừng hoạt động
                                </label>
                            </div>
                        </div>
                    </div>


                    <Link to={`/admin/role`}>

                        <button
                            type="button"
                            className="btn createProducts-btn"
                            onClick={submitFromdata}
                        >
                            Tạo mới
                        </button>
                    </Link>

                </div>
            </div>

        </>
    );

};

export default RoleCreate;
