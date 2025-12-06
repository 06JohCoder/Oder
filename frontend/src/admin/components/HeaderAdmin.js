
import { useState } from "react";
import ButtonNotifi from "../helpers/buttonNotifi";
import {Link} from "react-router-dom";
import {prefixAdmin} from "../../config/system";

// import "../css/components/HeaderAdmin"

function HeaderAdmin({query,setQuery}) {
 
 
  return (
    <>
       <header className="admin-topbar">
            <div className="admin-topbar-left">
              <div className="admin-topbar-title">Dashboard</div>
              <div className="admin-topbar-sub">Welcome back — quản trị hệ thống</div>
            </div>

            <div className="admin-topbar-right">
              <div className="admin-search">
                <span><i class="bi bi-search"></i></span>
                <input placeholder="Tìm người dùng, email, sản phẩm..." value={query} onChange={e => setQuery(e.target.value)} />
              </div>
              <div className="admin-actions">
             
                <ButtonNotifi/>
               
               <Link to={`${prefixAdmin}admin/deailCloud`}> 
               <button className="admin-btn"> <i class="bi bi-cloud"> </i></button>
               </Link>

               
                
                
                <button className="admin-btn admin-primary">New</button>
              </div>
            </div>
          </header>
    </>
  )
}

export default HeaderAdmin