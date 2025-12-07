
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./users/layouts/default";
import AdminLayout from "./admin/layouts/AdminLayout";
import NotFound from './Error/NotFound';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<DefaultLayout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );



}

export default App;