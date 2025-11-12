import { Link, useLocation } from "react-router-dom"
import "../css/components/SidebarAdmin.css"
import { prefixAdmin } from "../../config/system"
import { useState } from "react";

function SidebarAdmin() {

    const [menuOpen, setMenuOpen] = useState(true);
    const location = useLocation();
    // console.log(location.pathname.substring(1));
    const pathname = location.pathname.substring(1);

    return (
        <>
            <aside className={`admin-sidebar ${menuOpen ? '' : 'close-admin-menu'}`}>
                <div className="admin-brand admin-menu">
                    {/* <div className="admin-logo">AD</div> */}
                    <img className="admin-logo" src="/logo.jpg" alt="Admin Logo" />
                    <div>
                       {menuOpen && (
                        <>
                          <div className="admin-brand-title">Admin</div>
                          <div className="admin-brand-sub">Order Shop</div>
                        </>
                       )}
                    
                    </div>
                    <div className="admin-menu-toggle-wrapper" style={{right: menuOpen ? "" : "-15px"}} onClick={() => setMenuOpen(!menuOpen)}>
                        {/* <span className="admin-ico"> <i class="bi bi-list admin-menu-toggle"></i></span> */}
                        <span className="admin-ico">{menuOpen ? <i class="bi bi-arrow-bar-left"></i> : <i class="bi bi-arrow-bar-right"></i>}</span>


                    </div>
                </div>

                <nav className={`admin-menu`} >
                    <Link
                        to={`${prefixAdmin}admin`}
                        className={pathname === 'admin' ? 'active' : ''}
                    >
                        <i className="admin-ico bi bi-house"></i>
                        {menuOpen && <span className="admin-ico">Dashboard</span>}
                    </Link>

                    <Link
                        to={`${prefixAdmin}admin/productsAdmin`}
                        className={pathname === 'admin/productsAdmin' ? 'active' : ''}
                    >
                        <i className="admin-ico bi bi-bag"></i>
                        {menuOpen && <span className="admin-ico">Products</span>}
                    </Link>

                    <Link
                        to={`${prefixAdmin}admin/users`}
                        className={pathname === 'admin/users' ? 'active' : ''}
                    >
                        <i className="admin-ico bi bi-people"></i>
                        {menuOpen && <span className="admin-ico">Users</span>}
                    </Link>

                    <Link
                        to={`${prefixAdmin}admin/reports`}
                        className={pathname === 'admin/reports' ? 'active' : ''}
                    >
                        <i className="admin-ico bi bi-book"></i>
                        {menuOpen && <span className="admin-ico">Reports</span>}
                    </Link>


                    <Link
                     to={`${prefixAdmin}admin/chatting`}
                        className={pathname === 'admin/chatting' ? 'active' : ''}>
                
                        <i className="admin-ico bi bi-chat-dots"></i>
                        {menuOpen && <span className="admin-ico">Chatting</span>}
                    </Link>
                       
                    <Link
                        to={`${prefixAdmin}admin/setting`}
                        className={pathname === 'admin/setting' ? 'active' : ''}
                    >
                        <i className="admin-ico bi bi-gear"></i>
                        {menuOpen && <span className="admin-ico">Settings</span>}
                    </Link>

                </nav>

                <div className="admin-profile">
                    <div className="admin-avatar">N</div>
                    <div>
                       {menuOpen && (
                        <>
                          <div className="admin-name">Nguyen Van A</div>
                          
                          <div className="admin-role">Administrator</div>
                        </>
                       )}
                    </div>
                </div>
            </aside>

        </>
    )
}

export default SidebarAdmin