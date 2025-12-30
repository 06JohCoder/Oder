import { useState } from "react";
import "../../css/auth/login.css";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messagePassword, setMessagePassword] = useState("");
    const [alert ,setAlert] = useState("");;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setMessagePassword("")

        const url = '/api/admin/auth/login';
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (res.ok) {
                navigate("/admin");
            } else {
                setMessage(result.message );
                setMessagePassword(result.messagePassword )
                setAlert(result.alerts)
            }
        } catch (error) {
            console.error("Lỗi kết nối server Error:", error);
            // setMessage("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <header className="login-header">
                    <div className="icon-login">
                        <img
                            className="admin-logo_login"
                            alt="Admin Logo"
                            src="/logo.jpg"
                        />
                        <h1 className="logo-text">ADMIN</h1>
                    </div>
                    <p className="subtitle">Hệ thống quản trị viên</p>
                </header>

                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="input-group">
                        {message && <div className="error-alert" style={{color:"red"}}>{message}</div>}

                        <input
                            type="text"
                            name="email"
                            placeholder="Email hoặc số điện thoại"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                         {messagePassword && <div className="error-alert" style={{color:"red"}}>{messagePassword}</div>}
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ?
                            <>
                                <div class="spinner-border text-secondary" role="status" style={{
                                    height: "24px",
                                    width: "24px"
                                }}>
                                    <span class="visually-hidden">Loading...</span>

                                  
                                </div>
                                  <span className="loader">Đăng nhập</span>
                            </>

                            : "Đăng nhập"}

                    </button>
                </form>

                <div className="login-footer">
                    <a href="#" className="forgot-password">Quên mật khẩu?</a>
                    {alert && <div className="error-alert" style={{color:"red"}}>{alert}</div>}

                    <div className="divider"><span>HOẶC</span></div>
                    <p className="support-text">Hỗ trợ: <strong>0569.847.809</strong></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;