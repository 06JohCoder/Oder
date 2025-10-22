// Loading.jsx
import React from "react";
import "./Loading.css";

function Loading() {
  return (
    // <div className="loading-container">
    //   <div className="spinner"></div>
    //   <p>Đang tải dữ liệu...</p>
    // </div>

      <div className="loading-container">
         <div class="spinner spinner-grow text-primary loading-container" role="status">
          {/* <span class="visually-hidden">Loading...</span> */}
               
         </div>
            <p>Đang tải dữ liệu...</p>    
      </div>
  );
}

export default Loading;
