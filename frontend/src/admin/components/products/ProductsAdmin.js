import { useState, useEffect } from "react";
import "../../css/products/ProductsAdmin.css";
import ButtonTabs from "../../helpers/filterStatus";
import FilterListFood from "../../helpers/filterListFood";
import PaginationHelper from "../../helpers/pagination";
const ProductsAdmin = ({ query }) => {
  console.log("Query in ProductsAdmin:", query);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // mặc định là "All"
  const [activeName, setActiveName] = useState(1); // mặc định là "All"

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    search: query || "",
  });


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
          <ButtonTabs
            activeTab={activeTab}
            onTabClick={(tab) => setActiveTab(tab.id)}
          />
        </div>

        <button className="btn-accent">+ Thêm Sản Phẩm</button>
      </header>

      <div className="products-header">
        <FilterListFood
          activeTab={activeName}
          onTabClick={(tab) => setActiveName(tab.id)}
        />

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
      <PaginationHelper/>
    </div>
  );
};

export default ProductsAdmin;
