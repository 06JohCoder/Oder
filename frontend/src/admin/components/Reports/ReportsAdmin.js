import React, { useState } from "react";
import "../../css/reports/reports.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    Sector,
} from "recharts";

function ReportsAdmin() {
    const [activeIndex, setActiveIndex] = useState(-1);

    const [selectedMonth, setSelectedMonth] = useState("October 2025");

    // 🔹 Dữ liệu doanh thu theo tháng
    const revenueData = [
        { month: "Jan", revenue: 104500000 },
        { month: "Feb", revenue: 98500000 },
        { month: "Mar", revenue: 115000000 },
        { month: "Apr", revenue: 121000000 },
        { month: "May", revenue: 132000000 },
        { month: "Jun", revenue: 125000000 },
        { month: "Jul", revenue: 140000000 },
        { month: "Aug", revenue: 128000000 },
        { month: "Sep", revenue: 138500000 },
        { month: "Oct", revenue: 145000000 },
    ];

    // 🔹 Dữ liệu người dùng theo trạng thái
    const userStatus = [
        { name: "Active", value: 600 },
        { name: "Pending", value: 200 },
        { name: "Suspended", value: 100 },
    ];

    const COLORS = ["#16a34a", "#eab308", "#dc2626"];

    // 🔹 Dữ liệu chi tiết báo cáo
    const reportTable = [
        {
            id: 1,
            date: "2025-10-01",
            reportType: "New Users",
            value: 123,
            trend: "+12%",
        },
        {
            id: 2,
            date: "2025-10-05",
            reportType: "Revenue Growth",
            value: "₫ 24,500,000",
            trend: "+8%",
        },
        {
            id: 3,
            date: "2025-10-10",
            reportType: "User Suspensions",
            value: 4,
            trend: "-2%",
        },
    ];


    // 🔹 Xuất dữ liệu bảng ra CSV
    const handleExportExcel = () => {
        // Tạo worksheet từ dữ liệu bảng
        const worksheet = XLSX.utils.json_to_sheet(
            reportTable.map((r, index) => ({
                "#": index + 1,
                Date: r.date,
                "Report Type": r.reportType,
                Value: r.value,
                Trend: r.trend,
            }))
        );

        // Tạo workbook (file Excel)
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");

        // Xuất ra dạng binary
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        // Tạo file và tải xuống
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "DetailedReports.xlsx");
    };

    // End Xuất dữ liệu bảng ra CSV

    return (
        <>
            <section className="admin-grid">
                <div className="admin-card">
                    <h3>Total Revenue</h3>
                    <div className="admin-stat">
                        <div>
                            <div className="admin-big">₫ 145,000,000</div>
                            <div className="admin-trend">{selectedMonth}</div>
                        </div>
                        <div className="admin-right">
                            <div className="admin-trend">+5% vs last month</div>
                        </div>
                    </div>
                </div>

                <div className="admin-card">
                    <h3>Active Users</h3>
                    <div className="admin-stat">
                        <div>
                            <div className="admin-big">3,240</div>
                            <div className="admin-trend">+8% this month</div>
                        </div>
                        <div className="admin-right">
                            <div className="admin-trend">+2% vs last week</div>
                        </div>
                    </div>
                </div>

                <div className="admin-card">
                    <h3>Conversion Rate</h3>
                    <div className="admin-stat">
                        <div>
                            <div className="admin-big">64%</div>
                            <div className="admin-trend">This quarter</div>
                        </div>
                        <div className="admin-right">
                            <div className="admin-trend">+3% vs last quarter</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="admin-content" style={{ gridTemplateColumns: "2fr 1fr" }}>
                {/* 🔸 Biểu đồ đường doanh thu */}
                <div className="admin-card">
                    <div className="flex justify-between items-center mb-2">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Revenue Reports</h3>
                            <select
                           
                                className="admin-select"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                style={{ width:"150px"}}
                            >
                                <option>October 2025</option>
                                <option>September 2025</option>
                                <option>August 2025</option>
                            </select>
                        </div>

                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #475569",
                                color: "#ffff",
                                borderRadius: "8px",
                            }} />
                            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 🔸 Biểu đồ tròn trạng thái người dùng */}
                <div className="admin-card">
                    <h3>User Status Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={userStatus}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                activeIndex={activeIndex}
                                activeShape={(props) => (
                                    <g>
                                        <text x={props.cx} y={props.cy - 30} textAnchor="middle" fill="#fff">
                                            {props.name}
                                        </text>
                                        {/* <text x={props.cx} y={props.cy + 10} textAnchor="middle" fill="#94a3b8">
                                            {(props.percent * 100).toFixed(0)}%
                                        </text> */}
                                        {/* Khi hover sẽ phóng to lát thêm 8px */}
                                        <Sector
                                            {...props}
                                            outerRadius={props.outerRadius + 8}
                                            fill={props.fill}
                                        />
                                    </g>
                                )}
                                onMouseEnter={(_, index) => setActiveIndex(index)} //  thêm sự kiện hover
                                onMouseLeave={() => setActiveIndex(-1)} // bỏ hover thì trở lại bình thường
                            >
                                {userStatus.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index]}
                                        stroke="#1e293b"
                                        strokeWidth={activeIndex === index ? 2 : 1}
                                    />
                                ))}
                            </Pie>

                            <Legend />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #475569",
                                    borderRadius: "8px",
                                }}
                                labelStyle={{ color: "#facc15" }} // màu chữ của tiêu đề (thường là label)
                                itemStyle={{ color: "#f8fafc" }} // màu chữ của giá trị
                            />

                        </PieChart>

                    </ResponsiveContainer>
                </div>
            </section>

            {/* 🔸 Bảng chi tiết báo cáo */}
            <section className="admin-card admin-table mt-4">
                <div className="flex justify-between items-center mb-3">
                    <h3>Detailed Reports</h3>
                    <button className="admin-btn admin-primary"  onClick={handleExportExcel}>Export CSV</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Report Type</th>
                            <th>Value</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportTable.map((r, index) => (
                            <tr key={r.id}>
                                <td>{index + 1}</td>
                                <td>{r.date}</td>
                                <td className="admin-bold">{r.reportType}</td>
                                <td>{r.value}</td>
                                <td>{r.trend}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default ReportsAdmin;
