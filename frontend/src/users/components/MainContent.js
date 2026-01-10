import React from 'react';
import "../css/MainContent.css";
import PostFeed from './MainContents/PostFeed';
import Stories from './MainContents/Stories';
import { useRef, useEffect, useState } from "react";
import Slide from './MainContents/slide';
import Products from './MainContents/products';
import SlideSale from './MainContents/slideSale';
function MainContent() {




  const scrollRef = useRef();
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };


  const [message, setMessage] = useState("Đang tải...");
  useEffect(() => {
    // Gọi API từ backend
    fetch("/api/")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage("Lỗi kết nối với backend"));
  }, []);


  console.log("message nó ở đây", message)


  return (
    <main className="main-content col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      {/* Search Bar */}

      <div className="search-bar-container">
        <div className="custom-dropdown">
          <div className="dropdown-item">
            <div className="dropdown-selected active " id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {/* type="button"  */}
              <span className='addrress '>Địa điểm </span>
              <i className="bi bi-geo-alt " style={{ display: 'contents' }}>
                <span className='showAddress'>Hà Nội City</span>
              </i>
            </div>


            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Hà Nội </a></li>
              <li><a class="dropdown-item" href="#">Hồ Chí Minh</a></li>
              <li><a class="dropdown-item" href="#">Thanh Hóa</a></li>
            </ul>

          </div>

        </div>

        <div className="search-input-group">
          <button type="button">
            <span className="search-text">Tìm</span>
            <i className="bi bi-search search-icon"></i>
          </button>
          <input type="text" placeholder="Tìm kiếm theo tên, món ăn..." />

        </div>

         <div className="custom-dropdown">
          <div className="dropdown-item">
            <div className="dropdown-selected active " id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {/* type="button"  */}
              <span className='addrress '>Tìm Theo Giá </span>
              <i className="bi bi-tag " style={{ display: 'contents' }}>
                <span className='showAddress'>Hà Nội City</span>
              </i>
            </div>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Dưới 100k</a></li>
              <li><a class="dropdown-item" href="#">100k - 200k</a></li>
              <li><a class="dropdown-item" href="#">200k - 300k</a></li>
              <li><a class="dropdown-item" href="#">300k - 500k</a></li>
              <li><a class="dropdown-item" href="#">500k - 1 triệu</a></li>
              <li><a class="dropdown-item" href="#">Trên 1 triệu</a></li>
            </ul>

          </div>

        </div>

         <div className="custom-dropdown">
          <div className="dropdown-item">
            <div className="dropdown-selected active " id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {/* type="button"  */}
              <span className='addrress '>Bữa Ăn </span>
              <i class="bi bi-fork-knife" style={{ display: 'contents' }}></i>
              <span className='showAddress'>Hà Nội City</span>
            </div>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Bữa sáng</a></li>
              <li><a class="dropdown-item" href="#">Bữa trưa</a></li>
              <li><a class="dropdown-item" href="#">Bữa tối</a></li>
              <li><a class="dropdown-item" href="#">Bữa khuya</a></li>
              <li><a class="dropdown-item" href="#">Nướng</a></li>
              <li><a class="dropdown-item" href="#">Lẫu</a></li>
              <li><a class="dropdown-item" href="#">Combo</a></li>
              <li><a class="dropdown-item" href="#">Món khác</a></li>
            </ul>

          </div>

        </div>
      </div>

      {/* Stories Section */}
      <div className="stories-wrapper">
        <button className="arrow-btn left" onClick={scrollLeft}>
          ❮
        </button>
        <div className="stories-section" ref={scrollRef}>

          {[...Array(18)].map((_, i) => (

            <img src={`https://picsum.photos/id/${i + 1000}/40/40`} alt={`Story ${i + 1}`} className="poster-avatar" />

          ))}

        </div>
        <button className="arrow-btn right" onClick={scrollRight}>
          ❯
        </button>
      </div>
      {/* <Stories /> */}




      {/* Post Feed Section */}
      <PostFeed />
      {/*End Post Feed Section */}
      <div className="slide-content">
        <Slide />
        <SlideSale/>
      </div>
      {/* Create slide Section */}

      {/* End Create slide Section */}

      {/* Products */}

      <Products />

      {/* Endl Products */}



    </main>


  );
}

export default MainContent;