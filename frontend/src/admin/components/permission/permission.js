import React, { useState, useEffect } from "react";
import "../../css/permission/permission.css";
import AutoCloseNotification from "../alerts/AutoCloseNotification";
const PermissionPage = () => {
    const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);
       const [notifMessage, setNotifMessage] = useState("");
    const permissionList = [];
    const fetchData = async () => {
        try {
            const response = await fetch('/api/admin/role/permissions');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(data)

    const hanldSubmit = async () => {
        for (let i = 0; i < data.length; i++) {
            permissionList.push({
                roleId: data[i]._id,
                permissions: []
            });
            const checkboxes = document.querySelectorAll(`.permission-section-checkbox`);
            checkboxes.forEach((checkboxRow) => {
                const permissionName = checkboxRow.getAttribute('data-name');
                const checkbox = checkboxRow.querySelectorAll('input[type="checkbox"]')[i];
                if (checkbox.checked) {
                    permissionList[i].permissions.push(permissionName);
                }
            });
        }


        await fetch('/api/admin/role/permissions', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(permissionList),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // alert("Cập nhật phân quyền thành công!")
                setLoading(true);
                setNotifMessage("Cập nhật phân quyền thành công!")
                fetchData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }



    // console.log(data)

    return (
        <div className="permission">
            {loading && (<AutoCloseNotification
                message={notifMessage}
                onClose={() => setLoading(false)}
            />)}

            <div className="permission-container">
                <button className="permission-btn-update" onClick={hanldSubmit}>Cập nhật</button>
                <h2 className="permission-title">Thiết lập phân quyền</h2>

                {/* Bài viết */}
                <div className="permission-section-title">Bài viết</div>
                <table className="permission-table">
                    <thead>
                        <tr >
                            <th>Chức năng</th>
                            {data.map((roleItem) => (
                                <th key={roleItem._id} >{roleItem.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>ID</td>
                            {data.map((roleItem) => (
                                <td key={roleItem._id}>{roleItem._id}</td>
                            ))}
                        </tr> */}
                        <tr className="permission-section-checkbox" data-name="products-category-view">
                            <td>Xem</td>
                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-category-view")} />
                                </td>
                            ))}

                        </tr>

                        <tr className="permission-section-checkbox" data-name="products-category-create">
                            <td>Thêm mới</td>

                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-category-create")} />
                                </td>
                            ))}
                        </tr>

                        <tr className="permission-section-checkbox" data-name="products-category-change-status">
                            <td>Thay đổi trạng thái</td>
                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-category-change-status")} />
                                </td>
                            ))}

                        </tr>

                        <tr className="permission-section-checkbox" data-name="products-category-update">
                            <td>Cập nhật</td>

                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-category-update")} />
                                </td>
                            ))}
                        </tr>

                        <tr className="permission-section-checkbox" data-name="products-category-delete">
                            <td style={{ color: "#ff6b6b" }}>Xóa</td>

                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-category-delete")} />
                                </td>
                            ))}
                        </tr>


                    </tbody>
                </table>

                {/* Sản phẩm */}
                <div className="permission-section-title">Sản phẩm</div>
                <table className="permission-table">
                    <thead>
                        <tr>
                            <th>Chức năng</th>
                            {data.map((roleItem) => (
                                <th key={roleItem._id}>{roleItem.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>

                        <tr className="permission-section-checkbox" data-name="products-view">
                            <td>Xem</td>

                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-view")} />
                                </td>
                            ))}
                        </tr>

                        <tr className="permission-section-checkbox" data-name="products-create">
                            <td>Thêm mới</td>
                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-create")} />

                                </td>
                            ))}
                        </tr>

                        <tr className="permission-section-checkbox" data-name="products-change-status">
                            <td>Thay đổi trạng thái</td>
                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-change-status")} />

                                </td>
                            ))}

                        </tr>

                        <tr className="permission-section-checkbox" data-name="products-update">
                            <td>Cập nhật</td>

                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-update")} />

                                </td>
                            ))}
                        </tr>

                        <tr className="permission-section-checkbox" data-name="products-delete">
                            <td style={{ color: "#ff6b6b" }}>Xóa</td>

                            {data.map((roleItem) => (
                                <td key={roleItem._id}>
                                    <input type="checkbox" defaultChecked={roleItem.permissions.includes("products-delete")} />

                                </td>
                            ))}
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default PermissionPage;
