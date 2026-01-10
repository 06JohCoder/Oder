import Header from '../components/Header.js';
import MainContent from '../components/MainContent.js';
import { Routes, Route } from 'react-router-dom'; 
import Footed from '../components/foot/footed.js';
import "../css/index.css";
import "../js/index.js";
import Cart from '../pages/cart.js';

function DefaultLayout() {
  return (
    <>
      <div className="app-container">
        <Header />
      </div>

      <div className="app-body">
        <Routes>
          <Route path="/maincontent" element={<MainContent />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<MainContent />} />
        </Routes>
      </div>
      {/* <div className='app-footer'>
        <Footed/>
      </div> */}
    </>
  );
}

export default DefaultLayout;
