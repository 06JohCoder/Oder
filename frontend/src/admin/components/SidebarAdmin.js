import { Link, useLocation } from "react-router-dom"
import "../css/components/SidebarAdmin.css"
import { prefixAdmin } from "../../config/system"

function SidebarAdmin() {
    
  const location = useLocation();
  // console.log(location.pathname.substring(1));
  const pathname = location.pathname.substring(1);
  
    return (
        <>
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    {/* <div className="admin-logo">AD</div> */}
                       <img className="admin-logo" src="/logo.jpg" alt="Admin Logo" /> 
                    <div>
                        <div className="admin-brand-title">Admin</div>
                        <div className="admin-brand-sub">Order Shop</div>
                    </div>
                </div>

                <nav className="admin-menu">
                    <Link to={`${prefixAdmin}admin`} className={pathname == 'admin'?`active`:''}><span className="admin-ico"><i class="bi bi-house"></i></span> Dashboard</Link>
                    <Link to={`${prefixAdmin}admin/productsAdmin`} className={pathname == 'admin/productsAdmin'?"active":""}><span className="admin-ico"><i class="bi bi-bag"></i></span> Products</Link>
                    <Link to={`${prefixAdmin}admin/users`} className={pathname=='admin/users'?'active':''}><span  className="admin-ico"><i class="bi bi-people"></i></span> Users</Link>
                    <Link to={`${prefixAdmin}admin/reports`} className={pathname =='admin/reports'?'active':''} ><span className="admin-ico"><i class="bi bi-book"></i></span> Reports</Link>
                    <Link to={`${prefixAdmin}admin/setting `} className={pathname =='admin/setting'?'active':''}><span className="admin-ico"><i class="bi bi-gear"></i></span> Settings</Link>
                </nav>

                <div className="admin-profile">
                    <div className="admin-avatar">N</div>
                    <div>
                        <div className="admin-profile-name">Nhật (Admin)</div>
                        <div className="admin-profile-status">Online</div>
                    </div>
                </div>
            </aside>

        </>
    )
}

export default SidebarAdmin