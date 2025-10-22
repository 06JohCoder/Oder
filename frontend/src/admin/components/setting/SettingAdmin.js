import "../../css/setting/setting.css"

import React, { useState } from "react";

function SettingsAdmin() {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({
    name: "Nguyễn Văn A",
    email: "admin@system.com",
    phone: "0987654321",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cài đặt đã được lưu!");
  };

  return (
    <section >
      <h2 >⚙️ Settings Panel</h2>

      {/* Tabs */}
      <div className="admin-btn-group">
        {["profile", "security", "system", "appearance"].map((tab) => (
          <button
            key={tab}
            className={`admin-btn  ${
              activeTab === tab
                ? "admin-primary"
                : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "profile"
              ? "Profile"
              : tab === "security"
              ? "Security"
              : tab === "system"
              ? "System"
              : "Appearance"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "profile" && (
        <section className="admin-content" style={{gridTemplateColumns: "2fr 1fr", marginTop: "20px"}}>
          <form
            onSubmit={handleSubmit}
           
          >
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <div style={{marginTop: "20px"}}>
              <button className="admin-btn admin-primary">Save</button>
            </div>
          </form>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block mb-1">Old Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
             <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <a href="#" className="text-blue-600 hover:underline self-end">
              Forgot Password?
            </a>
          </form>
        </section>
      )}

      

      {activeTab === "system" && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">System Language</label>
            <select className="admin-select">
              <option>🇻🇳 Vietnamese</option>
              <option>🇬🇧 English</option>
              <option>🇯🇵 Japanese</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Time Zone</label>
            <select className="admin-select">
              <option>Asia/Ho_Chi_Minh (GMT+7)</option>
              <option>Asia/Tokyo (GMT+9)</option>
              <option>Europe/London (GMT+0)</option>
            </select>
          </div>
          <div className="text-right">
            <button className="admin-btn admin-primary">Save Changes</button>
          </div>
        </div>
      )}

      {activeTab === "appearance" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition"></div>
              <span
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  darkMode ? "translate-x-5" : ""
                }`}
              ></span>
            </label>
          </div>
          <div>
            <label className="block mb-1">Theme Color</label>
            <input type="color" className="w-16 h-10 rounded-md" />
          </div>
          <div className="text-right">
            <button className="admin-btn admin-primary">Apply</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default SettingsAdmin;
