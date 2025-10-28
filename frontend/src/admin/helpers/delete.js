

function Delete({ set, Id, setId, setNotifMessage, setLoading,setNotifKey }) {


    const deleteItem = () => {
        set((prev) => prev.filter((u) => u.id !== Id));
        setLoading(true)

        setNotifKey((prev) => prev + 1);
        if (!Id) {
            alert("Không tìm thấy productId để xóa!");
            return;
        }

        const url = `/api/admin/products/delete/${Id}`;

        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.message)
                    setNotifMessage(data.message);
                setId(Id)
            })
            .catch((err) => {
                console.error("Lỗi khi xóa sản phẩm:", err);
                setNotifMessage("Lỗi kết nối máy chủ!");
            });
    };

    return (
        <>
            <button className="admin-btn" onClick={deleteItem} title="Xóa sản phẩm">
                <i className="bi bi-trash"></i>
            </button>


        </>
    );
}

export default Delete;
