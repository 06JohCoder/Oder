import { useState, useEffect } from "react";
import "../../css/products/ProductsAdmin.css";
import ButtonTabs from "../../helpers/filterStatus";

const ProductsAdmin = ({ query }) => {
  console.log("Query in ProductsAdmin:", query);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // mặc định là "All"
  const [activeName, setActiveName] = useState(1); // mặc định là "All"
  // const buttonTabs = [
  //   { id: 1, title: "All" },
  //   { id: 2, title: "Active" },
  //   { id: 3, title: "Inactive" },
  // ];

  const nameList = [
    { id: 1, title: "All" },
    { id: 2, title: "Lẩu" },
    { id: 3, title: "Nướng" },
    { id: 4, title: "Cơm" },
    { id: 5, title: "Đồ rán" },
    { id: 6, title: "Đồ hấp & Luộc" },
    { id: 7, title: "Phở & Bún ...." },
    { id: 8, title: "Bánh rán ...." },
    { id: 9, title: "Ăn vặt" },
    { id: 10, title: "Đồ uống" },
    { id: 11, title: "Đồ ngoại" },
    { id: 12, title: "Combo" },
  ]

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    search: query || "",
  });



  // let url = "/api/admin/userAdmin";
  //   const params = [];



  const fetchProducts = (status) => {
    let url = "/api/admin/products";
    const params = [];
    if (status) {
      params.push(`status=${status}`);
    }
    if (query) {
      params.push(`keyword=${query}`);
    }
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }


    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  };

  // Gọi API mỗi khi tab thay đổi
  useEffect(() => {
    if (activeTab === 1) {
      fetchProducts();
    } else if (activeTab === 2) {
      fetchProducts("active");
    } else if (activeTab === 3) {
      fetchProducts("inactive");
    }
  }, [activeTab, query]);



  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Quản Trị Sản Phẩm</h1>
        <div >
          {/* {buttonTabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-btn ${activeTab === tab.id ? "admin-primary" : ""}`}
              onClick={() => setActiveTab(tab.id)}>
              {tab.title}
            </button>

          ))} */}
          <ButtonTabs
            activeTab={activeTab}
            onTabClick={(tab) => setActiveTab(tab.id)}
          />
        </div>

        <button className="btn-accent">+ Thêm Sản Phẩm</button>
      </header>
      <div className="products-header">

        <div style={{ display: "flex", gap: "10px" }}>
          {nameList.map((tab) => (
            <button
              key={tab.id}

              className={`admin-btn ${activeName === tab.id ? "admin-primary" : ""}`}
              onClick={() => {
                setActiveName(tab.id)
                setFilters({ ...filters, category: tab.id === 1 ? "" : tab.title })
              }}
            >
              {tab.title}
            </button>

          ))}
        </div>
      </div>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá (VNĐ)</th>
              <th>Trạng Thái</th>
              <th>Tồn Kho</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="storyHome-img"
                  /></td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}</td>
                {item.status === "active" ? <td style={{ color: "green" }}>Hoạt Động</td> : <td style={{ color: "red" }}>Ngừng Bán</td>}
                <td>{item.stock}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <button className="admin-btn" ><i class="bi bi-pen"></i></button>
                  <button className="admin-btn" ><i class="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdmin;
