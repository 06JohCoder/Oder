import "../css/leftSidebar.css";
import { prefixAdmin } from "../../config/system";
import  { useState,useEffect } from "react";
import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';
import cartControl from "../control/cart.control";
import { useLocation } from "react-router-dom";
import image from "../../image/qc3.png"
function LeftSidebar() {


  // Quảng cáo
      const ads = [
            {
                img: image,
                link: "https://duockienminh.vn/bot-chuoi-xanh-say-lanh",
            }

        ];
        const [currentAd, setCurrentAd] = useState(ads[0]);

        useEffect(() => {
            // Cứ 5 giây đổi quảng cáo 1 lần
            const interval = setInterval(() => {
                const randomAd = ads[Math.floor(Math.random() * ads.length)];
                setCurrentAd(randomAd);
            }, 5000);

            return () => clearInterval(interval);
        }, []);


  //end qc





  const [user, setUser] = useState(false)

  const location = useLocation();
  // console.log(location.pathname.substring(1));
  const pathname = location.pathname.substring(1);
  // const params = useParams();
  // console.log("Params:", params.userId);


  // số lượng đơn hàng

  const {countCart} = cartControl();





  const handleUser = () => {
    setUser(!user)
  }

 
  return (
    <aside className="left-sidebar col-xl-2 ">
            
      <div className="user-profile">
        <div className="avatar-placeholder">
          <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/481062781_613924754935331_8313690527543560000_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeH8RpCsYRPG13AtMFUgZLB0hevilmU_dM6F6-KWZT90zgO8B_P_Y8CI0a6Mdrq8kM-jLdc80ClUaXB0bPx4JGxO&_nc_ohc=KvkclNx5rOkQ7kNvwGf8ZxU&_nc_oc=Adm3YWkrs1rLliF_ZBwuynXyf56MDUq8uQNX6P4jHaSDoFhkncNwk7-ucSEEqGauj-I&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=cLaNBzU6QtkAJEFRwMVgHw&oh=00_AfWKlD2ejprbc5iQiGCEmJYZC--KRCFOSZzuhBcaW5WM7A&oe=68994D5D" alt="User Avatar" className=" avatar-placeholder" />
        </div>
        <span>Lương Việt Nhật</span>
      </div>
      <nav className="sidebar-nav">
        {/* <a to="#" className="active">Quán Gần Đây</a>
        <a href="#">Video</a> */}
            <Link to={`${prefixAdmin}`} className={pathname === '' ? 'active' : ''}>
              <i className="bi bi-house-door food-icon-sidebar-left"></i> Trang chủ
            </Link>
            <Link to={`${prefixAdmin}maincontent`} className={pathname === 'maincontent' ? 'active' : ''}>
              <i className="bi bi-geo-alt food-icon-sidebar-left"></i> Quán Gần Đây
            </Link>
            <Link to={`${prefixAdmin}video`} className={pathname === 'video' ? 'active' : ''}>  
              <i className="bi bi-play-btn food-icon-sidebar-left"></i> 
              <span>Video</span>
            </Link>
            <Link to={`${prefixAdmin}cart`} className={(pathname === 'cart' || pathname === 'cart/pay') ? 'active' : ' '} >
             
                  <i class="bi bi-basket food-icon-sidebar-left "></i>
                  Giỏ hàng 
                  {countCart ?<i class="bi bi-bell-fill overlay-icon">
                    <span className="overlay-count">9</span>
                  </i> :" " }
                  {/* <i class="bi bi-bell-fill overlay-icon">
                    <span className="overlay-count">9</span>
                  </i> */}
            </Link>
            <Link to="/doneOrder" className={pathname ==='doneOrder' ? 'active' : ' '}>
              <i className="bi bi-bag-check food-icon-sidebar-left"></i> Đơn hàng đã mua
            </Link>
            <Link to="#">
              <i className="bi bi-credit-card food-icon-sidebar-left"></i> Thanh toán
            </Link>
            <Link to="/location" className={pathname ==='location' ? 'active' : ' ' }>
              <i className="bi bi-geo  food-icon-sidebar-left"></i> Vị trí hiện tại
            </Link>
      </nav>

         <div  class="ad-box" style={{height:"auto",marginTop:"30px",marginRight:"10px"}}>
                    <a href={currentAd.link} target="_blank" rel="noopener noreferrer">
                        <img src={currentAd.img} alt="Quảng cáo"  />
                    </a>
         </div>

    </aside>
  );
}

export default LeftSidebar;




