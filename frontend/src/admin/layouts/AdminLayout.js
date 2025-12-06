import React, { useEffect, useState } from "react";
import "../layouts/AdminLayout.css"; // Import CSS file
import SidebarAdmin from "../components/SidebarAdmin";
import HeaderAdmin from "../components/HeaderAdmin";
import { Routes, Route } from "react-router-dom";
import ProductsAdmin from "../components/products/ProductsAdmin";
import MainAdmin from "../components/MainAdmin";
import UsersAdmin from "../components/users/usersAdmin";
import "../css/effects.css"
import ReportsAdmin from "../components/Reports/ReportsAdmin";
import SettingsAdmin from "../components/setting/SettingAdmin";
import Could from "../components/could/Could";
import ChatUI from "../components/chatting/Chatting";
import ProductsBackUp from "../components/backUp/ProductsAdmin.backUp";
import MyEditor from "../components/tinyMCE/MyEditor";
import AddCategory from "../components/AddCategory/AddCategory";
import EditCategory from "../components/AddCategory/editCAtegory";

export default function AdminDashboard() {



  const [query, setQuery] = useState("");

  return (
    <div className="admin-app">
      <div className="admin-container">
        {/* ===== SIDEBAR ===== */}
        <SidebarAdmin />
        {/* ===== MAIN CONTENT ===== */}

        <main className="admin-main">
          <HeaderAdmin query={query} setQuery={setQuery} />
          <Routes> 
            <Route path="/" element={<MainAdmin query={query} />} />
            <Route path="/productsAdmin" element={<ProductsAdmin query={query}/>} />
            <Route path="/users" element={<UsersAdmin query={query}/>} />
            <Route path="/addCategory" element = {<AddCategory/>} />
            <Route path="/editCategory/:id" element = {<EditCategory/>} />
            <Route path="/reports" element={<ReportsAdmin />} />
            <Route path="/deailCloud" element={<Could/>}/>
            <Route path="/setting" element={<SettingsAdmin />} />
            <Route path="/chatting" element={<ChatUI />} />
            <Route path="/myeditor" element={<MyEditor />} />
            <Route path="/deletedItems" element={<ProductsBackUp/>} />
            <Route path="*" element={<MainAdmin />} />
          </Routes>
       


          <footer className="admin-footer">© {new Date().getFullYear()} Clau Admin — Crafted with care</footer>
        </main>
      </div>
    </div>
  );
}
