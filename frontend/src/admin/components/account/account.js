import { useEffect, useState } from "react";
import "../../css/user/user.css"
import AutoCloseNotification from "../../components/alerts/AutoCloseNotification";
import PaginationHelper from "../../helpers/pagination";
import Delete from "../../helpers/delete";
function Account() {


    const [activeTab, setActiveTab] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState([]);
    const [newUser, setNewUser] = useState({
        fullname: "",
        email: "",
        phone: "",
        users: "",
        password: "",
        role_id: "",
        status: "inActive",
    });


    // --- Chọn người dùng để chỉnh sửa ---
    const handleSelect = (user) => {
        // console.log(user);
        setSelected(user);
        setShowAddUser(false);
    };


    // --- Cập nhật thông tin người dùng ---
    const handleSave = () => {
        if (selected) {
            setUsers((prev) =>
                prev.map((u) => (u.id === selected.id ? selected : u))
            );
            // alert("Đã lưu thay đổi!");
            setShowNotification(true);
        }
    };



    // --- Thêm người dùng mới ---
    const handlAddAcount = () => {
        setSelected(null);
        setShowAddUser(true);

    };


    // --- Thêm người dùng mới ---
    const handleAddUser = () => {
        const newId = users.length + 1;
        setUsers([...users, { ...newUser, id: newId }]); // -- cập nhập ở giao diện trước rồi gọi lên sever để lưu và database
        setNewUser({ name: "", email: "", users: "", password: "", role: "User", status: "Pending" });
        alert("Đã thêm người dùng mới!");
    };


    const fetchApiUser = async (e) => {
        e.preventDefault();

        if (newUser.users === newUser.password) {
            alert("Không nhập mật khẩu trùng với tên người dùng")
        } else {
            try {
                const res = await fetch('/api/admin/listAccount/create', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser),
                });

                const data = await res.json();
                // console.log(data);
                if (data.message) {
                    setShowAddUser(false);
                }
                alert(data.message);
            } catch (err) {
                console.error(err);
                alert("Lỗi tạo tài khoản");
            }
        }


    };


    // --- lấy dử liệu (list account) từ backend ---


    const fetchAccounts = () => {
        let url = '/api/admin/listAccount';
        fetch(url)
            .then(res => res.json())
            .then(res => setUsers(res.records))
    }

    const fetchRole = () => {
        let url = '/api/admin/listAccount/create';
        fetch(url)
            .then(res => res.json())
            .then(data => setRole(data))
    }

       console.log(role)
    useEffect(() => {
        fetchRole();
        fetchAccounts();
    }, newUser);
    
    console.log(users)

    return (
        <>

            {showNotification && (
                <AutoCloseNotification
                    message="Xác nhận thành công!"
                    onClose={() => setShowNotification(false)}
                />
            )}
            <section className="admin-content" style={{ gridTemplateColumns: (selected !== null || showAddUser === true) ? "2fr 1fr" : "1fr" }}>
                <div>
                    <div className="admin-card admin-table">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3>Users overview</h3>
                            <div className="admin-actions">
                                <button className="admin-btn admin-primary">All</button>
                                <button className="admin-btn"> Black List</button>
                                <button className="admin-btn"> Account Good</button>
                                <button className="admin-btn" onClick={handlAddAcount}> Add Account</button>


                            </div>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((u, index) => (
        
                                    <tr key={u.id}>
                                        <td>{index + 1}</td>
                                        <td>{u.fullname}</td>
                                        <td className="admin-bold"> {u.email}</td>
                                        <td className="admin-bold">{u.phone}</td>
                                        <td className="admin-bold">{u.password}</td>
                                        <td>{u.role.name}</td>
                                        {/* <td><span className={`admin-badge ${u.status === "active" ? "admin-active" : ""}`}>{u.status}</span></td> */}
                                        <td>{u.status}</td>
                                        <td style={{ display: "flex", gap: "5px" }} >
                                            <button className={`admin-btn ${activeTab === u.id ? "admin-primary" : ""}`}
                                                onClick={() => {
                                                    handleSelect(u);
                                                    setActiveTab(u.id);
                                                }}
                                            ><i className="bi bi-pen" ></i></button>
                                            <Delete set={setUsers} userId={u.id} />

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* <PaginationHelper /> */}
                    </div>

                </div>
                <aside className="admin-panel" >

                    {showAddUser === true ? (
                        <section className="admin-card">
                            <h3>Add Account</h3>
                            <div className="admin-editor" style={{ display: "grid", gap: "10px" }}>
                                <form onSubmit={fetchApiUser}>
                                    <input className="admin-input" required placeholder="Tên người dùng" type="text" value={newUser.fullname} onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })} style={{ marginTop: "5px" }} />
                                    <input className="admin-input" required placeholder="Email" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} style={{ marginTop: "5px" }} />
                                    <input className="admin-input" required placeholder="Sđt" type="number" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} style={{ marginTop: "5px" }} />
                                    <input className="admin-input" required placeholder="Username" type="text" value={newUser.users} onChange={(e) => setNewUser({ ...newUser, users: e.target.value })} style={{ marginTop: "5px" }} />
                                    <input className="admin-input" required placeholder="Mật khẩu" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} style={{ marginTop: "5px" }} />
                                    <div className="admin-form-row" >
                                        <select className="admin-select" value={newUser.role_id} onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })} style={{ width: "100%" }}>
                                          
                            
                                            <option >------------Chọn------------</option>

                                                {role.map((u) => (
                                                    <option key={u._id} value={u._id}>
                                                        {u.name}
                                                    </option>
                                                ))}
                                        

                                        </select>
                                    </div>
                                    <div className="admin-form-row">

                                        <select className="admin-select" value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
                                            <option>Active</option>
                                            <option>InActive</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="admin-btn admin-primary" style={{ marginTop: "5px" }} >
                                        Tạo tài khoản
                                    </button>

                                </form>

                            </div>
                        </section>
                    ) : ""}


                    {(selected !== null) ? (
                        <div className="admin-card">
                            <h3>User editor</h3>

                            <div className="admin-editor" style={{ display: "grid", gap: "10px" }}>
                                <div className="admin-field">
                                    <label htmlFor="name" className="admin-label">Name</label>
                                    <input
                                        id="name"
                                        className="admin-input"
                                        value={selected.name}
                                        onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                                    />
                                </div>

                                <div className="admin-field">
                                    <label htmlFor="email" className="admin-label">Email</label>
                                    <input
                                        id="email"
                                        className="admin-input"
                                        value={selected.email}
                                        onChange={(e) => setSelected({ ...selected, email: e.target.value })}
                                    />
                                </div>

                                <div className="admin-field">
                                    <label htmlFor="users" className="admin-label">Username</label>
                                    <input
                                        id="users"
                                        className="admin-input"
                                        value={selected.users}
                                        onChange={(e) => setSelected({ ...selected, users: e.target.value })}
                                    />
                                </div>

                                <div className="admin-field">
                                    <label htmlFor="password" className="admin-label">Password</label>
                                    <input
                                        id="password"
                                        className="admin-input"
                                        value={selected.password}
                                        onChange={(e) => setSelected({ ...selected, password: e.target.value })}
                                    />
                                </div>


                                <div className="admin-form-row" style={{ display: "grid", gap: "10px" }}>
                                    <div className="admin-field" style={{ display: "flex", gap: "5px" }}>

                                        <select
                                            id="role"
                                            className="admin-select"
                                            value={selected.role}
                                            onChange={(e) => setSelected({ ...selected, role: e.target.value })}
                                        >
                                            <option>Admin</option>
                                            <option>Moderator</option>
                                            <option>User</option>
                                        </select>
                                        <select
                                            id="status"
                                            className="admin-select"
                                            value={selected.status}
                                            onChange={(e) => setSelected({ ...selected, status: e.target.value })}
                                        >
                                            <option>Active</option>
                                            <option>Pending</option>
                                            <option>Suspended</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="admin-form-row">
                                    <button className="admin-btn admin-primary" onClick={handleSave}>Save</button>
                                    <button className="admin-btn" onClick={() => {
                                        setSelected(null)
                                        setActiveTab(null)
                                    }}>Cancel</button>
                                </div>
                            </div>

                        </div>
                    ) : ""}




                </aside>
            </section>



        </>
    );
}

export default Account;
