import { useState ,useEffect} from "react";


function FilterListFood({ activeTab, onTabClick }) {
    const [listNameFood, setListNameFood] = useState([
        
    ]);

    const apiListFood = () => {
        fetch("/api/admin/category")
            .then((res) => res.json())
            .then((data) => {
                setListNameFood(data);
            })
            .catch((err) => {
                console.error("Lỗi khi lấy danh mục món ăn:", err);
            });
    }
 

    useEffect(() => {
        apiListFood()
    }, [])


    return (
        <div style={{ display: "flex", gap: "10px" }}>
              <button
                    onClick={() => onTabClick(null, null)}
                    className={`admin-btn ${activeTab === null ? "admin-primary" : ""}`}
                >
                    Tất cả
                </button>
            {listNameFood.map((tab) => (
                <button
                    key={tab._id}
                    className={`admin-btn ${activeTab === tab._id ? "admin-primary" : ""}`}
                    onClick={() => onTabClick(tab.category, tab._id)}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    );
}

export default FilterListFood;