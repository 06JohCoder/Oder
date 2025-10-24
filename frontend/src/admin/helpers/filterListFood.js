const nameList = [
    { id: 1, title: "All" },
    { id: 2, title: "Lẩu" },
    { id: 3, title: "Nướng" },
    { id: 4, title: "Cơm" },
    { id: 5, title: "Đồ rán" },
    { id: 6, title: "Đồ hấp & Luộc" },
    { id: 7, title: "Phở & Bún ...." },
    { id: 8, title: "Bánh rán ...." },
    { id: 9, title: "Ăn vặt" },
    { id: 10, title: "Đồ uống" },
    { id: 11, title: "Đồ ngoại" },
    { id: 12, title: "Combo" },
]

function FilterListFood({ activeTab, onTabClick }) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {nameList.map((tab) => (
                <button
                    key={tab.id}
                    className={`admin-btn ${activeTab === tab.id ? "admin-primary" : ""}`}
                    onClick={() => onTabClick(tab)}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    );
}

export default FilterListFood;