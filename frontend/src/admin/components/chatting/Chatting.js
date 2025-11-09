import React, { useState, useRef, useEffect } from "react";
import "../../css/chatting/ChatUI.css";
function ChatUI() {
  const [messages, setMessages] = useState([
    { id: 1, from: "them", text: "Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?", time: "09:30" },
    { id: 2, from: "me", text: "Mình muốn xem demo giao diện chat.", time: "09:31" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const newMsg = {
      id: Date.now(),
      from: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((m) => [...m, newMsg]);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        <div className="chat-layout">
          {/* Sidebar */}
          <aside className="chat-sidebar">
            <div className="chat-header">
              <div className="chat-logo">B</div>
              <div>
                <div className="chat-title">Booktrap Chat</div>
                <div className="chat-status">Online</div>
              </div>
            </div>
            <div className="chat-user-list">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="chat-user-item">
                  <div className="chat-user-avatar">U</div>
                  <div className="chat-user-info">
                    <div className="chat-user-name">User {i + 1}</div>
                    <div className="chat-user-preview">Tin nhắn mới</div>
                  </div>
                  <div className="chat-user-time">09:{10 + i}</div>
                </div>
              ))}
            </div>
          </aside>

          {/* Chat area */}
          <main className="chat-main">
            <header className="chat-topbar">
              <div className="chat-partner">
                <div className="chat-partner-avatar">C</div>
                <div>
                  <div className="chat-partner-name">Customer Support</div>
                  <div className="chat-partner-status">Thường trả lời trong vài phút</div>
                </div>
              </div>
              <div className="chat-active">Active now</div>
            </header>

            <div ref={scrollRef} className="chat-messages">
              {messages.map((m) => (
                <div key={m.id} className={`chat-bubble-row ${m.from === "me" ? "me" : "them"}`}>
                  <div className={`chat-bubble ${m.from}`}>
                    <div>{m.text}</div>
                    <div className="chat-time">{m.time}</div>
                  </div>
                </div>
              ))}
              <div className="chat-system">Đã kết nối — {messages.length} tin nhắn</div>
            </div>

            <div className="chat-input-bar">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn... (Enter để gửi, Shift+Enter xuống dòng)"
                className="chat-input"
              />
              <button onClick={sendMessage} className="chat-send-btn">
                Gửi
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


export default ChatUI;
