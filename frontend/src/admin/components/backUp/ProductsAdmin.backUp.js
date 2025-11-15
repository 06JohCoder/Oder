import { useState, useEffect } from "react";
import "../../css/products/ProductsAdmin.css";
import PaginationHelper from "../../helpers/pagination";
import AutoCloseNotification from "../alerts/AutoCloseNotification";
import Delete from "../../helpers/delete";
import CreatProducts from "../creatProduct/creatProducts";
import EditProducts from "../creatProduct/editPtoducts";

const ProductsBackUp = ({ query }) => {
    // console.log("Query in ProductsAdmin:", query);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState(1); // mặc định là "All"
    const [activeName, setActiveName] = useState(1); // mặc định là "All"
    const [loading, setLoading] = useState(false);
    const [notifMessage, setNotifMessage] = useState("");
    const [idDelete, setIdDelete] = useState("");
    const [idEdit, setIdEdit] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [tab, setTab] = useState(1)
    // Xử lý phần frontend về thông báo



    const [notifKey, setNotifKey] = useState(0);



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
        if (category) {
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


    const fetchUsersAdim = () =>{
            let url = "/api/admin/userAdmin"
            fetch(url)
            .then((res) => res.json())
            .then((res) => {

                setProducts(res.data)
                setTotalPages(res.objPagination.totalPages)
            })
    }

    useEffect(() => {
        let status = "";
        let category = "";




        fetchProducts(status, category);
    }, [activeTab, activeName, query, page, idDelete]);


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

    };




    // option 
    const statusOptions = [
        { id: 1, value: "Delete" },
        { id: 2, value: "Khôi Phục" },

    ];

    const buttonTabs = [
        { id: 1, title: "Products", value: "" },
        { id: 2, title: "User", value: "User" },

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

    /* Change position */
    const [idPosition, setIdPosition] = useState([])

    const handleChangePosition = (index, e) => {
        const value = e.target.value
        const updatePosition = [...products]

        updatePosition[index].position = value


        setProducts(updatePosition)



        // lấy ra item vừa thay đổi
        const changedItem = updatePosition[index]
        // console.log(changedItem)


        setIdPosition((prev) => {
            const filtered = prev.filter(p => p.id !== changedItem._id);

            return [...filtered, { id: changedItem._id, position: value }];
        })


    }


    /*Endl Change position */





    /*-------Check one----- */





    const handleCheck = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const handleUpdateChangeMulti = async () => {


        /* Xóa nhiều sản phẩm */
        if (newStatus === "delete-all") {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("Bạn có chắc chắn");
            if (!result) {
                return
            }
        }

        if (newStatus === "change-position") {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("Bạn có chắc chắn");
            if (!result) {
                return
            }
        }


        if (!newStatus) {
            alert("Chọn trạng thái")
        }
        if (selectedIds.length === 0) return alert("chưa có sản phẩm nào được chọn")


        fetch(`/api/admin/products/change-multi`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedIds, idPosition, newStatus }),
        })
            .then(res => res.json())
            .then(data => {
                setNotifMessage(data.message)
                setLoading(true);
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
            <CreatProducts setProducts={setProducts} setNotifMessage={setNotifMessage}
                setLoading={setLoading} />

            <EditProducts idEdit={idEdit} setProducts={setProducts} />
            {loading && (<AutoCloseNotification
                key={notifKey}
                message={notifMessage}
                onClose={() => setLoading(false)}
            />)}

            <header className="products-header">
                <h1>Khôi Phục</h1>
                <div >
                    <div style={{ display: "flex", gap: "10px" }}>
                        {buttonTabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`admin-btn ${activeTab === tab.id ? "admin-primary" : ""}`}
                                onClick={() => { setActiveTab(tab.id); }}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                </div>
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

            </header>

            <div className="products-header">





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
                            <th>Loại Đồ Ăn</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
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

                                <td style={{ color: "red" }}>
                                    <a
                                        style={{ cursor: "pointer" }}
                                        data-status={item.status}
                                        data-id={item.id}
                                    >
                                        {item.category}
                                    </a>
                                </td>



                                <td style={{ display: "flex", gap: "5px" }}>
                                    <button className="admin-btn" class="admin-btn"
                                    ><i class="bi bi-arrow-left-right"></i></button>
                                    <Delete set={setProducts} Id={item._id} setId={setIdDelete} setNotifMessage={setNotifMessage} setLoading={setLoading} setNotifKey={setNotifKey} />
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

export default ProductsBackUp;
