// import { useState, useEffect } from "react";
import "../../css/products/ProductsAdmin.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const RoleHome = () => {
 
    const [data,setDataa] = useState([]);

    useState(() => {
        let url = "/api/admin/role/create";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setDataa(data);
            })
    }, []);

    console.log("data",data)
  


    


  return (
    <div className="products-page">

      <header className="products-header">
        <h1>Quản Trị Sản Phẩm</h1>
          <div div style={{ display: "flex", gap: "10px" }}>

        <Link to = {`/admin/role/create`}>
        <button className="btn-accent" type="button" >
            + Thêm Sản Phẩm
          </button>
        </Link>
          

        </div>
     


      </header>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>STT </th>
              <th>Nhóm Quyền</th>
              <th>Miêu tả</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <button className="admin-btn">Sửa</button>
                  <button className="admin-btn">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default RoleHome;
