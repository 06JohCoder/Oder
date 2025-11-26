import { useEffect, useState } from "react";
import "../../css/AddCategory/AddCategory.css";

const ProductsAdmin = () => {
    const [showAdd ,setShowAdd ] = useState(true)
    const [data,setData] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        father_id:"",
        img: "",
        position: "",
        status: "active",
  
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    // console.log(formData)
    const submitCategory = async () => {
        alert("DDax vaof")
        let url = "/api/admin/category/create";
        try {
            const res = await fetch(url,{
                method:"POST",
                headers:{"Content-type" : "application/json"},
                body: JSON.stringify(formData)
            })

                 const data = await res.json();
           
                 if (res.ok) { 
                
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
            
        } catch(error) {
                console.error("Error:", error);
        }
    }

    const dataCategory = () =>{
        let url = "/api/admin/category"

        fetch(url)
            .then(res => res.json())
            .then(res => setData(res)) 
            .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
    }

    useEffect(() =>{
        dataCategory();
    },[])


    console.log(data)

return (
  <>
   <div div style={{ display: "flex", gap: "10px" }}>
          
          <button className="btn-accent" type="button" onClick={() => setShowAdd(!showAdd)}>
                {showAdd ? `Hiện Danh Mục` : "+ Thêm Danh Mục"}
          </button>

        </div>
         
    {showAdd ? (
      <div className="products-container">
        {/* BÊN TRÁI: danh sách danh mục */}
        {/* <div className="products-left">
          <h3>Danh sách danh mục</h3>
          <ul>
            <li>Danh mục A</li>
            <li>Danh mục B</li>
            <li>Danh mục C</li>
          </ul>
        </div> */}
        {/* BÊN PHẢI: form thêm danh mục */}
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
            <label className="form-label">Danh Mục Cha</label>
            <input
              type="text"
              name="father_id"
              className="form-control createProducts-input"
              placeholder="Nhập ID danh mục cha..."
              value={formData.father_id}
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

          <div className="mb-3">
            <label className="form-label">Ảnh (URL)</label>
            <input
              type="url"
              name="img"
              className="form-control createProducts-input"
              placeholder="Dán link ảnh vào đây..."
              value={formData.img}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vị trí</label>
            <input
              type="number"
              name="position"
              className="form-control createProducts-input"
              placeholder="Nhập vị trí hiển thị"
              value={formData.position}
              onChange={handleChange}
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
                <label className="form-check-label">
                  Dừng hoạt động
                </label>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn createProducts-btn"
            onClick={submitCategory}
          >
            Tạo mới
          </button>
        </div>
      </div>
    ) : (
       <div className="products-table">
        <table>
          <thead>
            <tr>
              {/* <th><input
                type="checkbox"
                name="checkall"
                onChange={handleCheckAll}
                checked={selectedIds.length === products.length}
              /></th> */}

              <th>ID</th>
              <th>Tên</th>
              <th>Danh Mục Cha</th>
              <th>Trạng Thái</th>
              <th>Vị Trí</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          {/* <tbody>
            {products.map((item, index) => (
              <tr key={item._id}>
                <td><input
                  type="checkbox"
                  name="id"
                  checked={selectedIds.includes(item._id)}
                  onChange={() => handleCheck(item._id)}
                /></td>

                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="storyHome-img"
                  /></td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}</td>
                {item.status === "active" ? <td style={{ color: "green" }}><a
                  style={{ cursor: "pointer" }}
                  data-status={item.status}
                  data-id={item.id}
                  onClick={() => handleChangeStatus(item._id, item.status)}

                >Hoạt Động</a></td> : <td style={{ color: "red" }}> <a
                  style={{ cursor: "pointer" }}
                  data-status={item.status}
                  data-id={item.id}
                  onClick={() => handleChangeStatus(item._id, item.status)}

                >Ngừng Bán</a></td>}
                <td>
                  <input
                    type="number"
                    value={item.position}
                    style={{ width: "60px" }}
                    min="1"
                    name="position"
                    onChange={(e) => handleChangePosition(index, e)}



                  />
                </td>
                <td>{item.stock}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <button className="admin-btn" class="admin-btn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasEditProduct"
                    aria-controls="offcanvasEditProduct"
                    onClick={() => setIdEdit(item._id)}

                  ><i class="bi bi-pen"></i></button>
                  <Delete set={setProducts} Id={item._id} setId={setIdDelete} setNotifMessage={setNotifMessage} setLoading={setLoading} setNotifKey={setNotifKey} />
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    )}
  </>
);

};

export default ProductsAdmin;
