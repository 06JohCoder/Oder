import { useState, useEffect } from "react";
import AutoCloseNotification from "./alerts/AutoCloseNotification";
import PaginationHelper from "../helpers/pagination";
import Delete from "../helpers/delete";
import Loading from "../helpers/loading";
import { apiFetch } from '../../utils/apiFetch';
import { useNavigate } from "react-router-dom";
function MainAdmin({ query }) {

  const [users, setUsers] = useState([]);
  console.log(users)
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [sumUsers, setSumUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [idUser, setIdUser] = useState(null);

  console.log("bbb", sumUsers)

  const handleChangeUser = (e) => {
    const { value } = e.target;
    setSelected((prev) => ({
      ...prev,
      name: value,
    }));
  }
  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setSelected((prev) => ({
      ...prev,
      email: value,
    }));
  }

  const handleChangeRole = (e) => {
    const { value } = e.target;
    setSelected((prev) => ({
      ...prev,
      role: value,
    }));
  }

  const handleChangeAction = (e) => {
    const { value } = e.target;
    setSelected((prev) => ({
      ...prev,
      status: value,
    }))
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };



  const checkBoxSetting = () => {
    setShowNotification(true);
  }

  // Tìm kiếm nhiều tiêu chí
  const [filters, setFilters] = useState({
    status: "",
    role: "",
    userName_email: "",
  });


  // ====== Danh sách option ======
  const statusOptions = [
    { id: 1, value: "", label: "All" },
    { id: 2, value: "Active", label: "Active" },
    { id: 3, value: "Pending", label: "Pending" },
    { id: 4, value: "Suspended", label: "Suspended" }
  ];

  const roleOptions = [
    { id: 1, value: "", label: "All" },
    { id: 6, value: "Admin", label: "Admin" },
    { id: 7, value: "Moderator", label: "Moderator" },
    { id: 8, value: "User", label: "User" }
  ];





  const fetchUser = () => {
    let url = '/api/admin/userAdmin';
    const params = [];


    if (filters.status) {
      params.push(`status=${filters.status}`);
    }
    if (filters.role) {
      params.push(`role=${filters.role}`);
    }
    if (query) {
      params.push(`userName_email=${query}`);
    }
    if (page) {
      params.push(`page=${page}`);
    }
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }


    apiFetch(url)
      // .then((res) => res.json()) đã trả res.json ở bên apiFetch
      .then((res => {
        setUsers(res.data)
        setTotalPages(res.objPagination.totalPages)
        setSumUsers(res.data)
      }))
      .catch(err => {
        if (err.status === 401) {
          navigate('/admin/auth/login');
        }
        // if (err.status === 200) {
        //   navigate('/admin');
        // }
      });
  };






  const editUser = async () => {
    try {
      const res = await fetch(`/api/admin/userAdmin/edit/${selected._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });

      if (res.ok) {
        fetchUser();
        setShowNotification("Cập nhật thành công!");
        setSelected(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUser();
    }, 500);
    return () => clearTimeout(delayDebounce);

  }, [filters, query, page]);





  const idDeleteUser = (Id) => {

    // eslint-disable-next-line no-restricted-globals
    const result = confirm("Bạn có chắc chắn muốn xóa user này?");
    if (result) {
      if (Id) {
        const url = `/api/admin/userAdmin/delete/${Id}`;

        apiFetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setIdUser(Id);
            setShowNotification(res.message);
            fetchUser();
          })
          .catch((err) => {

          });

      }

    }
  }





  return (
    <>
      {
        (users && users.length === 0) ?
          <div className="admin-page-title">
            <Loading message="Đang Thống Kê..." />
          </div> : <div>
            {showNotification && <AutoCloseNotification
              message={showNotification}
              onClose={() => setShowNotification(false)} />}
            <section className="admin-grid">
              <div className="admin-card">
                <h3>Users</h3>
                <div className="admin-stat">
                  <div>
                    <div className="admin-big">{sumUsers.length}</div>
                    <div className="admin-trend">Active users</div>
                  </div>
                  <div className="admin-right"><div className="admin-trend">+6% vs last week</div></div>
                </div>
              </div>
              <div className="admin-card">
                <h3>Users Suspended</h3>
                <div className="admin-stat">
                  <div>
                    <div className="admin-big">{users?.filter(u => u.status === "Pending").length}</div>
                    <div className="admin-trend">Active Suspended</div>
                  </div>
                  <div className="admin-right"><div className="admin-trend">+2% vs last week</div></div>
                </div>
              </div>
              <div className="admin-card">
                <h3>Users Pending</h3>
                <div className="admin-stat">
                  <div>
                    <div className="admin-big">{users?.filter(u => u.status === "Pending").length}</div>
                    <div className="admin-trend">Active Pending</div>
                  </div>
                  <div className="admin-right"><div className="admin-trend">+1% vs last week</div></div>
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
              <div className="admin-card">
                <h3>
                  Spending</h3>
                <div className="admin-stat">
                  <div>
                    <div className="admin-big">₫ - 24,500,000</div>
                    <div className="admin-trend">This month</div>
                  </div>
                  <div className="admin-right"><div className="admin-trend">+1% vs last month</div></div>
                </div>
              </div>
              <div className="admin-card">
                <h3>

                  Reserves & Investments </h3>
                <div className="admin-stat">
                  <div>
                    <div className="admin-big">₫ 26,500,000</div>
                    <div className="admin-trend">This month</div>

                  </div>
                  <div className="admin-right">
                    <div className="admin-trend">+1% vs last month</div>
                    <div className="admin-trend">
                      Reserves & Investments = Revenue x 21.3%</div>

                  </div>
                </div>
              </div>
            </section>

            <section className="admin-content">
              <div>
                <div className="admin-card admin-table">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>

                    <h3>Users overview</h3>


                    <div style={{ display: "flex", gap: "10px" }}>



                      <select
                        name="status"
                        className="admin-btn"
                        onChange={handleChange}
                      >
                        {statusOptions?.map((opt) => (
                          <option key={opt.id} value={opt.value} >
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      {/* Dropdown vai trò */}
                      <select
                        name="role"
                        className="admin-btn"
                        onChange={handleChange}
                      >
                        {roleOptions?.map((opt) => (
                          <option key={opt.id} value={opt.value} >
                            {opt.label}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((u, index) => (
                        <tr key={u.id}>
                          <td>{index + 1}</td>
                          <td className="admin-bold">{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.role}</td>
                          <td><span className={`admin-badge ${u.status === "Active" ? "admin-active" : ""}`}>{u.status}</span></td>
                          <td style={{ display: "flex", gap: "5px" }}>
                            <button className="admin-btn" onClick={() => setSelected(u)}><i class="bi bi-pen"></i></button>
                            <button className="admin-btn" onClick={() => idDeleteUser(u._id)}><i class="bi bi-trash"></i></button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <PaginationHelper totalPages={totalPages} page={page} setPage={setPage} />
                </div>

                <div className="admin-card">
                  <h3>Quick actions</h3>
                  <div className="admin-btn-group">
                    <button className="admin-btn">Invite user</button>
                    <button className="admin-btn">Export CSV</button>
                    <button className="admin-btn admin-primary">Create product</button>
                  </div>
                </div>

                <div className="admin-card">
                  <h3>Activity</h3>
                  <div className="admin-feed">
                    <div className="admin-feed-item">User <strong>Nguyễn Văn A</strong> đăng nhập từ IP 110.234.45.1</div>
                    <div className="admin-feed-item">Order <strong>#1209</strong> đã thanh toán — ₫1,200,000</div>
                    <div className="admin-feed-item">Backup database hoàn tất (2:14 AM)</div>
                  </div>
                </div>
              </div>


              <aside className="admin-panel">
                <div className="admin-card">
                  <h3>User editor</h3>
                  {selected ? (
                    <div className="admin-editor">
                      <input className="admin-input" defaultValue={selected.name} onChange={handleChangeUser} />
                      <input className="admin-input" defaultValue={selected.email} style={{ marginTop: "10px" }} onChange={handleChangeEmail} />
                      <div className="admin-form-row">
                        <select className="admin-select" defaultValue={selected.role} onChange={handleChangeRole}>
                          <option>Admin</option>
                          <option>Moderator</option>
                          <option>User</option>
                        </select>
                        <select className="admin-select" defaultValue={selected.status} onChange={handleChangeAction}>
                          <option>Active</option>
                          <option>Pending</option>
                          <option>Suspended</option>
                        </select>
                      </div>
                      <div className="admin-form-row">
                        <button className="admin-btn admin-primary" onClick={editUser} >Save</button>
                        <button className="admin-btn" onClick={() => setSelected(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="admin-muted">Chọn một user từ bảng để chỉnh sửa.</div>
                  )}
                </div>
                <div className="admin-card">
                  <h3>Quick stats</h3>
                  <div className="admin-kpi-grid">
                    <div className="admin-kpi"><h4>Orders</h4><div className="admin-kpi-value">1,240</div></div>
                    <div className="admin-kpi"><h4>Visitors</h4><div className="admin-kpi-value">24,230</div></div>
                    <div className="admin-kpi"><h4>Conversion</h4><div className="admin-kpi-value">3.6%</div></div>
                    <div className="admin-kpi"><h4>Refunds</h4><div className="admin-kpi-value">12</div></div>
                  </div>
                </div>

                <div className="admin-card">
                  <h3>Settings</h3>
                  <div className="admin-settings" style={{ display: "flex", gap: "5px" }}>
                    <label><input type="checkbox" defaultChecked onClick={checkBoxSetting} /> Enable maintenance mode</label>
                    <label><input type="checkbox" onClick={checkBoxSetting} /> Send weekly reports</label>
                    <small>Timezone: Asia/Bangkok</small>
                  </div>
                </div>
              </aside>
            </section>



          </div>

      }

    </>
  )
}



export default MainAdmin