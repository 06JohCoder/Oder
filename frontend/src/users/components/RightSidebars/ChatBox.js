import React, { useState, useEffect } from "react";
import "./ChatBox.css";

function ChatBox({  chatList, onClose }) {



  return (
    <div className="grid-chat">
      {chatList.map((chat, index) => (
        <div
          key={chat.id}
          className={`chat-box ${index === 0 ? "rightmost" : ""}`}
          style={{ right: `${index * 310}px` }}

        >
          <div className="chat-header">
            <div className="chat-info">
              <img className="contact-avatar" src={chat.avatar} alt={chat.name} />
              <strong>{chat.nameGroup || chat.name}</strong>
            </div>

            <div className="button-container">
              <button className="button-MinimClose" title="Call">
                <i className="bi bi-telephone"></i>
              </button>
              <button className="button-MinimClose" title="Video">
                <i className="bi bi-camera-video"></i>
              </button>
              <button className="button-MinimClose" title="Minimize">
                <i className="bi bi-dash-lg" onClick={() => onClose(chat.id)}></i>
              </button>
              <button className="button-MinimClose" title="Close">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>


          <div className="chat-body">
            <p>{chat.lastMessage}</p>
          </div>

          <div className="chat-footer">
            <div className="chat-actions">
              <button title="Emoji"><i className="bi bi-emoji-smile"></i></button>
              <button title="Attach"><i className="bi bi-paperclip"></i></button>
              <button title="Mic"><i className="bi bi-mic-fill"></i></button>
            </div>
            <div className="input-wrapper">
              <textarea
                className="chat-input"
                placeholder="Aa"
                rows="1"
                onFocus={(e) => e.target.parentElement.parentElement.classList.add('expanded')}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.parentElement.parentElement.classList.remove('expanded');
                  }
                }}
              ></textarea>
              <button className="send-button">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
}

export default ChatBox;
