

const buttonTabs = [
  { id: 1, title: "All", value: "" },
  { id: 2, title: "Active", value: "Active" },
  { id: 3, title: "Inactive", value: "Inactive" },
];

function ButtonTabs({ activeTab, onTabClick }) {
  
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {buttonTabs.map((tab) => (
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

export default ButtonTabs;