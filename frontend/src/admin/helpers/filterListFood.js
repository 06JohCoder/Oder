const nameList = [
    { id: 1, title: "All"  },
    { id: 2, title: "Lẩu" ,category :"lau"},
    { id: 3, title: "Nướng",category :"nuong" },
    { id: 4, title: "Cơm" ,category :"com"},
    { id: 5, title: "Đồ rán",category :"do_ran" },
    { id: 6, title: "Đồ hấp & Luộc" ,category :"do_hap_luoc"},
    { id: 7, title: "Phở & Bún ...." ,category :"lau"},
    { id: 8, title: "Bánh rán ...." ,category :"banh_ran"},
    { id: 9, title: "Ăn vặt" ,category :"lau"},
    { id: 10, title: "Đồ uống" ,category :"do_uong"},
    { id: 11, title: "Đồ ngoại" ,category :"lau"},
    { id: 12, title: "Combo" ,category :"combo"},
]


function FilterListFood({ activeTab, onTabClick }) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {nameList.map((tab) => (
                <button
                    key={tab.id}
                    className={`admin-btn ${activeTab === tab.id ? "admin-primary" : ""}`}
                    onClick={() => onTabClick(tab.category, tab.id)}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    );
}

export default FilterListFood;