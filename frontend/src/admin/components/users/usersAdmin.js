import { useState } from "react";
import "../../css/user/user.css"
import AutoCloseNotification from "../../components/alerts/AutoCloseNotification";
function UsersAdmin() {

    const [activeTab, setActiveTab] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [users, setUsers] = useState([
        { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", users: "a1234", password: "123", role: "Admin", status: "Active" },
        { id: 2, name: "Nguyễn Văn B", email: "b@gmail.com", users: "b1234", password: "123", role: "User", status: "Pending" },
        { id: 3, name: "Nguyễn Văn C", email: "c@gmail.com", users: "c1234", password: "123", role: "Moderator", status: "Suspended" },
    ]);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        users: "",
        password: "",
        role: "User",
        status: "Pending",
    });


    // --- Chọn người dùng để chỉnh sửa ---
    const handleSelect = (user) => {
        // console.log(user);
        setSelected(user);
        setShowAddUser(false);
    };

    // --- Xóa người dùng ---
    const handleDelete = (id) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
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
        setUsers([...users, { ...newUser, id: newId }]);
        setNewUser({ name: "", email: "", users: "", password: "", role: "User", status: "Pending" });
        alert("Đã thêm người dùng mới!");
    };

    return (
        <>
        
        {showNotification && (
        <AutoCloseNotification
            message="Xác nhận thành công!"
            onClose={() => setShowNotification(false)}
        />
    )}

            <section className="admin-grid">
                <div className="admin-card">
                    <h3>Visit</h3>
                    <div className="admin-stat">
                        <div>
                            <div className="admin-big">{(10000).toLocaleString()}</div>
                            <div className="admin-trend">Visit users per month</div>
                        </div>
                        <div className="admin-right"><div className="admin-trend">+6% vs last week</div></div>
                    </div>
                </div>
                <div className="admin-card">
                    <h3>Users Login</h3>
                    <div className="admin-stat">
                        <div>
                            <div className="admin-big">{(5403).toLocaleString()}</div>
                            <div className="admin-trend">User created account</div>
                        </div>
                        <div className="admin-right"><div className="admin-trend">+6% vs last week</div></div>
                    </div>
                </div>

                <div className="admin-card">
                    <h3>Revenue</h3>
                    <div className="admin-stat">
                        <div>
                            <div className="admin-big">₫ 124,500,000</div>
                            <div className="admin-trend">This month</div>
                        </div>
                        <div className="admin-right"><div className="admin-trend">+12% vs last month</div></div>
                    </div>
                </div>


            </section>


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
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u, index) => (
                                    <tr key={u.id}>
                                        <td>{index + 1}</td>
                                        <td className="admin-bold">{u.name}</td>
                                        <td className="admin-bold">{u.users}</td>
                                        <td className="admin-bold">{u.password}</td>
                                        <td>{u.email}</td>
                                        <td>{u.role}</td>
                                        <td><span className={`admin-badge ${u.status === "Active" ? "admin-active" : ""}`}>{u.status}</span></td>
                                        <td style={{ display: "flex", gap: "5px" }} >
                                            <button className={`admin-btn ${activeTab === u.id ? "admin-primary" : ""}`}
                                             onClick={() => {
                                                handleSelect(u);
                                                setActiveTab(u.id);
                                             }}
                                             ><i className="bi bi-pen" ></i></button>
                                            <button className="admin-btn" onClick={() => {
                                                handleDelete(u.id);
                                                
                                            }}><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="admin-pagination">
                            <button className="admin-btn">Previous</button>
                            <span>Page 1 of 3</span>
                            <button className="admin-btn">Next</button>
                        </div>
                    </div>

                    <section className="admin-card" style={{ marginTop: "15px" }}>
                        <h3>History</h3>
                        <ul className="admin-log">
                            <li>[10:30] Admin Nhật đã chỉnh sửa tài khoản Nguyễn Văn A</li>
                            <li>[09:45] Nguyễn Văn C bị khóa tài khoản</li>
                            <li>[08:10] Thêm tài khoản mới “Trần Văn D”</li>
                        </ul>
                    </section>

                </div>

                <aside className="admin-panel" >

                    {showAddUser === true ? (
                        <section className="admin-card">
                            <h3>Add Users</h3>
                            <div className="admin-editor" style={{ display: "grid", gap: "10px" }}>
                                <input className="admin-input" placeholder="Tên người dùng" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                                <input className="admin-input" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                                <input className="admin-input" placeholder="Username" value={newUser.users} onChange={(e) => setNewUser({ ...newUser, users: e.target.value })} />
                                <input className="admin-input" placeholder="Mật khẩu" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                                <div className="admin-form-row">
                                    <select className="admin-select" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                                        <option>Admin</option>
                                        <option>Moderator</option>
                                        <option>User</option>
                                    </select>
                                    <select className="admin-select" value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
                                        <option>Active</option>
                                        <option>Pending</option>
                                        <option>Suspended</option>
                                    </select>
                                </div>
                                <button className="admin-btn admin-primary" onClick={handleAddUser}>
                                    Tạo tài khoản
                                </button>
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
                                    <button className="admin-btn" onClick={() =>{ 
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

export default UsersAdmin;
