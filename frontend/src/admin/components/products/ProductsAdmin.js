import { useState, useEffect } from "react";
import "../../css/products/ProductsAdmin.css";
import ButtonTabs from "../../helpers/filterStatus";
import FilterListFood from "../../helpers/filterListFood";
import PaginationHelper from "../../helpers/pagination";
import AutoCloseNotification from "../alerts/AutoCloseNotification";
import Delete from "../../helpers/delete";

const ProductsAdmin = ({ query }) => {
  // console.log("Query in ProductsAdmin:", query);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // mặc định là "All"
  const [activeName, setActiveName] = useState(1); // mặc định là "All"
  const [loading, setLoading] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  const [idDelete, setIdDelete] = useState("");
 

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  // Xử lý phần frontend về thông báo

  const [notifKey, setNotifKey] = useState(0);

  //Kết thúc Xử lý phần frontend về thông báo



  const [filters, setFilters] = useState({
    status: "",
    category: "",
    search: query || "",
  });


  const fetchProducts = (status, category) => {
    let url = "/api/admin/products";
    const params = [];
    if (status) {
      params.push(`status=${status}`);
    }
    if (query) {
      params.push(`keyword=${query}`);
    }

    if (page > 1) {
      params.push(`page=${page}`);
    }
    if(category){
      params.push(`category=${category}`)
    }
  
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    

    fetch(url)
      .then((res) => res.json())
      .then((res) => {

        setProducts(res.data)
        setTotalPages(res.objPagination.totalPages)
      })
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  };


 useEffect(() => {
  let status = "";
  let category = "";

  // tab → xác định trạng thái
  if (activeTab === 2) status = "active";
  else if (activeTab === 3) status = "inactive";

  // activeName → xác định category
  switch (activeName) {
    case "1":
      category = "pho_bun";
      break;
    case "2":
      category = "com";
      break;
    default:
      category = "";
  }

  fetchProducts(status, category);
}, [activeTab, activeName, query, page,idDelete]);


  // Change status
  const handleChangeStatus = async (id, status) => {
    setLoading(true);
    setNotifMessage("Thay Đổi Trạng Thái Thành Công!")
    setNotifKey((prev) => prev + 1);

    const statusChange = status === "active" ? "inactive" : "active";


    setProducts(prev =>
      prev.map(p =>
        p._id === id ? { ...p, status: statusChange } : p
      )
    );

    const url = `/api/admin/products/change-status/${statusChange}/${id}`;

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: statusChange }),
    })
      .then(res => res.json())
      .then(result => {
        console.log("Cập nhật xong:", result);
        fetchProducts();
      })
      .catch(err => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Cập nhật thất bại!");
      })
    // .finally(() => {
    //   setLoading(false);
    // });
  };


 



  // Endl Delete

  // option 
  const statusOptions = [

    { id: 1, value: "active" },
    { id: 2, value: "inactive" },

  ];

  // Change-multi


  const [selectedIds, setSelectedIds] = useState([]);
  const [newStatus, setNewStatus] = useState("active");

  // console.log(newStatus)
  /*-------Check all----- */
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(products.map((item) => item._id))

    } else {
      setSelectedIds([])
    }
  }

  /*-------Check one----- */

  const handleCheck = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleUpdateChangeMulti = async () => {
    if (!newStatus) {
      alert("Chọn trạng thái")
    }
    if (selectedIds.length === 0) return alert("chưa có sản phẩm nào được chọn")


    fetch(`/api/admin/products/change-multi`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: selectedIds, newStatus }),
    })
      .then(res => res.json())
      .then(data => {
        setNotifMessage(data.message)
        setLoading(true);
        // alert( );
        fetchProducts();
      })
      .catch(err => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Cập nhật thất bại!");
      })
  }
  //Endl change-multi


  return (
    <div className="products-page">

      {loading && (<AutoCloseNotification
        key={notifKey}
        message={notifMessage}
        onClose={() => setLoading(false)}
      />)}

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

        <div style={{ display: "flex", gap: "10px" }}>

          <select
            name="status"
            className="admin-select"
            style={{ width: "130px" }}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.id} value={opt.value} >
                {opt.value}
              </option>
            ))}


          </select>

          <button className="btn-accent" onClick={handleUpdateChangeMulti}>Áp Dụng</button>

        </div>


      </div>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th><input
                type="checkbox"
                name="checkall"
                onChange={handleCheckAll}
                checked={selectedIds.length === products.length}
              /></th>

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
            {products.map((item, index) => (
              <tr key={item._id}>
                <td><input
                  type="checkbox"
                  name="id"
                  checked={selectedIds.includes(item._id)} //kiểm cha xem trong selecIds có không nếu có thì mới true
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
                <td>{item.stock}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <button className="admin-btn" ><i class="bi bi-pen"></i></button>
                  <Delete set={setProducts} Id={item._id} setId={setIdDelete} setNotifMessage={setNotifMessage} setLoading={setLoading} setNotifKey={setNotifKey}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationHelper totalPages={totalPages} page={page} setPage={setPage} />

    </div>
  );
};

export default ProductsAdmin;
