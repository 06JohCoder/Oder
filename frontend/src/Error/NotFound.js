import React from 'react';
import './NotFound.css'; // Giả định bạn có file CSS cho phong cách

const NotFound = () => {
  const memes = [
    "Chúng tôi đã tìm kiếm khắp nơi, kể cả dưới ghế sofa.",
    "Trang này đã 'tự cách ly' và không muốn bị tìm thấy.",
    "Có vẻ bạn đã lạc vào Vùng Đất Hứa... mà không có bản đồ.",
    "Lỗi 404: Trang bạn tìm kiếm đã trốn đi chơi.",
    "Máy chủ: 'Tôi không biết trang này là gì, bạn có chắc không?'",
    "Đây là trang 404. Nó hơi ngại giao tiếp xã hội.",
  ];

  const randomMeme = memes[Math.floor(Math.random() * memes.length)];

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>🤯 404: Trang Không Tìm Thấy</h1>
        <p className="big-text">
          **Ôi không!** Có vẻ như đường dẫn này đã 'tan biến' vào hư vô.
        </p>
        <p className="meme-text">
          ***"{randomMeme}"***
        </p>
        
        <div className="action-buttons">
          <a href="/" className="home-button">
            Quay Về Trang Chủ An Toàn
          </a>
          <button onClick={() => window.history.back()} className="back-button">
            Thử Quay Lại Lần Nữa (May Mắn Lần Sau)
          </button>
        </div>
        
        <p className="small-text">
          (Đừng lo, lỗi này là do máy chủ chứ không phải do bạn đâu. Hứa đấy!)
        </p>
      </div>
      
    </div>
  );
};

export default NotFound;