import Header from '../components/Header.js';
import LeftSidebar from '../components/LeftSidebar.js';
import MainContent from '../components/MainContent.js';
import DoneOrder from '../pages/doneOrder.js';
import Location from '../pages/location.js';
import Pays from '../pages/pay.js';
import { Routes, Route } from 'react-router-dom'; 

import "../css/index.css";
import "../js/index.js";
import Cart from '../pages/cart.js';
import HomeInfo from '../components/HomeInfo/HomeInfo.js';

function DefaultLayout() {
  return (
    <>
      <div className="app-container">
        <Header />
      </div>

      <div className="app-body">
        <LeftSidebar />

        <Routes>
          {/* <Route path="/" element={<HomeInfo />} /> */}
          <Route path="/maincontent" element={<MainContent />} />
          {/* <Route path="/video" element={<VideoPage />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/pay" element={<Pays />} />
          <Route path="/doneOrder" element={<DoneOrder />} />
          {/* <Route path="/location" element={<Location />} /> */}
          <Route path="*" element={<MainContent />} />
        </Routes>

        {/* <RightSidebar /> */}
      </div>
    </>
  );
}

export default DefaultLayout;
