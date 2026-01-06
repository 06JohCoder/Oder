import { useState, useEffect, useRef } from "react";
import "../../css/auth/forgot-support.css";
import {Link } from "react-router-dom";
const ForgotPasswordSupport = () => {
    const [messages, setMessages] = useState([
        { from: "admin", text: "Xin chào! 👋 Tôi là nhân viên hỗ trợ kỹ thuật. Bạn cần giúp đỡ gì về tài khoản hoặc mật khẩu không?", time: "08:00" }
    ]);
    const [input, setInput] = useState("");
    const chatBodyRef = useRef(null);

    // Tự động cuộn xuống khi có tin nhắn mới
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setMessages(prev => [
            ...prev,
            { from: "user", text: input, time: now },
            { from: "admin", text: "Admin đã nhận được thông tin, vui lòng chờ trong giây lát hệ thống đang kiểm tra... 🛠️", time: now }
        ]);
        setInput("");
    };

    return (
        <div className="support-admin-viewport">
            <div className="support-admin-layout">
                {/* THANH SIDEBAR BÊN TRÁI */}
                <aside className="support-admin-sidebar">
                    <div className="support-admin-logo-section">
                        <div className="support-admin-logo">
                            <i className="bi bi-shield-lock-fill"></i>
                        </div>
                        <h3>Admin Control</h3>
                    </div>
                    
                    <nav className="support-admin-menu">
                        <div className="support-admin-menu-item active">
                            <i className="bi bi-chat-square-dots"></i>
                            <span>Hỗ trợ trực tuyến</span>
                        </div>
                        <div className="support-admin-menu-item">
                            <i className="bi bi-journal-text"></i>
                            <span>Tài liệu hướng dẫn</span>
                        </div>
                        <div className="support-admin-menu-item">
                            <i className="bi bi-shield-check"></i>
                            <span>Bảo mật tài khoản</span>
                        </div>
                        <div className="support-admin-menu-item logout">
                            <i className="bi bi-box-arrow-left"></i>
                            <Link to="/admin/auth/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Trở về trang chủ</span>
                            </Link>
                        </div>
                    </nav>
                </aside>

                {/* KHU VỰC CHAT CHÍNH Ở GIỮA */}
                <main className="support-admin-chat-area">
                    <header className="support-admin-header">
                        <div className="support-admin-header-user">
                            <div className="support-admin-avatar">
                                <img src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff" alt="Admin" />
                                <span className="status-indicator"></span>
                            </div>
                            <div className="support-admin-header-title">
                                <h4>Support Team <i className="bi bi-patch-check-fill text-primary"></i></h4>
                                <small>Đang hoạt động</small>
                            </div>
                        </div>
                        <div className="support-admin-header-tools">
                            <button className="tool-btn"><i className="bi bi-telephone"></i></button>
                            <button className="tool-btn"><i className="bi bi-gear"></i></button>
                        </div>
                    </header>

                    <div className="support-admin-chat-body" ref={chatBodyRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`support-admin-message-row ${msg.from}`}>
                                <div className="support-admin-message-bubble">
                                    <p>{msg.text}</p>
                                    <span className="message-timestamp">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <footer className="support-admin-chat-footer">
                        <div className="support-admin-input-box">
                            <button className="action-btn"><i className="bi bi-paperclip"></i></button>
                            <input
                                type="text"
                                placeholder="Mô tả lỗi hoặc yêu cầu của bạn tại đây..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button className="support-admin-send-btn" onClick={sendMessage}>
                                <span>Gửi tin</span>
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </div>
                    </footer>
                </main>

                {/* THANH THÔNG TIN BÊN PHẢI */}
                <aside className="support-admin-info-bar">
                    <div className="support-admin-info-card">
                        <h5>Thông tin liên hệ</h5>
                        <div className="info-item">
                            <i className="bi bi-phone-vibrate"></i>
                            <div>
                                <p>Hotline hỗ trợ</p>
                                <strong>0569 847 809</strong>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="bi bi-chat-left-dots"></i>
                            <div>
                                <p>Zalo cá nhân</p>
                                <strong>0569 847 809</strong>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="bi bi-envelope"></i>
                            <div>
                                <p>Email kỹ thuật</p>
                                <strong>nhatluong1252006@gmail.com</strong>
                            </div>
                        </div>
                    </div>

                    <div className="support-admin-manager-box">
                        <h5>Người phụ trách</h5>
                        <div className="manager-info">
                            <div className="manager-avatar-text">A</div>
                            <h6>Lường Việt Nhât</h6>
                            <span>Quản lý hệ thống</span>
                        </div>
                        <div className="work-time-badge">
                            <i className="bi bi-clock"></i> 08:00 - 22:00
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ForgotPasswordSupport;