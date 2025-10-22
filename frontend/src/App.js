
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./users/layouts/default";
import AdminLayout from "./admin/layouts/AdminLayout";
function App() {
  // return (
  //  <>
  //    <DefaultLayout />
  //  </>
  // );


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );



}

export default App;