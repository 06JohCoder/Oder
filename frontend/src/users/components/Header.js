import "../css/header.css";
function Header() {
  

      const closeMenu = () => {
        const listMenu = document.querySelector('.list-menu');
        listMenu.classList.remove('active');
    }
      const showMenu = () => {
        const listMenu = document.querySelector('.list-menu');
        listMenu.classList.add('active');

    }
 


    
  return (
    <>
      <header className="app-header">
        <div className="header-left col-xl-9 col-lg-9 col-md-2">
          <div className="logo">Order</div>
          <nav className="main-nav">
            {/* <a href="#">Ăn uống ▾</a> */}
         
            <a className={`dropdown-toggle`} id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }} >
              Ăn & uống
            </a>
                <div className="dropdown-menu">
                  <a href="#">Nhà hàng Việt</a>
                  <a href="#">Nhà hàng Nhật</a>
                  <a href="#">Nhà hàng Hàn</a>
                  <a href="#">Nhà hàng Trung</a>
                  <a href="#">Nhà hàng Âu</a>
                  <a href="#">Nhà hàng Thái</a>
                  <a href="#">Buffet</a>
                  <a href="#">Lẩu & Nướng</a>
                  <a href="#">Hải sản</a>
                  <a href="#">Đồ ăn chay</a>
                  <a href="#">Quán nhậu</a>
                  <a href="#">Cà phê & Bánh</a>
                  <a href="#">Đồ ăn nhanh</a>
              </div>
            
            <a href="#">Nhà hàng uy tín</a>
            <a href="#">Ưu đãi hot</a>
            <a href="#">Mới nhất</a>
            <a className="dropdown-toggle" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }}>
                Tin tức & Blog
            </a>

           <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">Sự kiện ẩm thực</a></li>
                <li><a class="dropdown-item" href="#">Chương trình khuyến mãi</a></li>
                <li><a class="dropdown-item" href="#">Tin tức thị trường</a></li>
                <li><a class="dropdown-item" href="#">Review nhà hàng</a></li>
                <li><a class="dropdown-item" href="#">Công thức món ngon</a></li>
                <li><a class="dropdown-item" href="#">Blog du lịch & ẩm thực</a></li>
           </ul>
              
          </nav>
        </div>
       
        <div className="header-right col-xl-3 col-lg-3 col-md-10">
            <div className="header-right-children " >
                <span className="phone-number">0569 847 809</span>
                <button type="button" className="btn btn-primary btn-sm">Small button</button>
            </div>
          
            <div className="food-icons">
              
              <div className="food-icon">
                <i className="bi bi-bag-check"></i> 
              </div>
              <div className="food-icon">
                <i className="bi bi-basket"></i>
              </div>
              <div className="food-icon">
                <i className="bi bi-cash-coin"></i> 
              </div>
              <div className="food-icon">
                 <i className="bi bi-geo-alt-fill"></i> 
              </div>
              
              <div className="food-show-menu icon-menu" onClick={showMenu}>
                    <i className="bi bi-list"></i>
              </div>

            </div>
            
             <div className="list-menu">
                <div className="food-show-menu close-menu" onClick={closeMenu}>
                  <i class="bi bi-x-lg"></i>
                  </div>
                <ul className="menu-list">
                    <li><a href="">TRANG CHỦ</a></li>
                    <li><a href="">DỊCH VỤ</a></li>
                    <li><a href="">GIỚI THIỆU</a></li>
                    <li><a href="">MẪU WEB</a></li>
                    <li><a href="">KIẾN THỨC</a></li>
                    <li><a href="../LienHe/contact.html">LIÊN HỆ</a></li>
                </ul>
            </div>
        </div>
      </header>
    </>
  );
}

export default Header;