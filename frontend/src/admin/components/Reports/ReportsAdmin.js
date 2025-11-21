import React, { useEffect, useState } from "react";
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
    const [year, setYear] = useState([2026, 2025, 2024]);
    const [selectedMonth, setSelectedMonth] = useState("October 2025");
    const [selectedReportType, setSelectedReportType] = useState(1); // 1: Thông tin tổng quan đơn hàng, 2: Thống kê sản phẩm
    const [infoOrder, setInfoOrder] = useState([]);

  

    // Lấy dử liệu từ database

    const fetchExportInfoOrder = () => {
        let url = '/api/admin/infoOrder';
        fetch(url)
            .then(res => res.json())
            .then(res => setInfoOrder(res));
    };

    useEffect(() => {
        fetchExportInfoOrder();
    }, []);

 



    //End Lấy dử liệu từ database


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

    const reportProducts = [
        {
            id: 1,
            orderId: "ORD001",
            productName: "Bò lúc lắc",
            quantity: 2,
            unitPrice: 120000,
            shippingFee: 0,
            total: 2 * 120000, // 240000
        },
        {
            id: 2,
            orderId: "ORD001",
            productName: "Nước ép cam",
            quantity: 2,
            unitPrice: 55000,
            shippingFee: 0,
            total: 2 * 55000, // 110000
        },
        {
            id: 3,
            orderId: "ORD002",
            productName: "Phở bò tái",
            quantity: 3,
            unitPrice: 120000,
            shippingFee: 0,
            total: 3 * 120000, // 360000
        },
        {
            id: 4,
            orderId: "ORD002",
            productName: "Trà sữa trân châu",
            quantity: 2,
            unitPrice: 45000,
            shippingFee: 0,
            total: 2 * 45000, // 90000
        },
    ];

    // 🔹 Xuất dữ liệu bảng ra CSV
    const handleExportExcel = () => {

        // ===== SHEET 1: ORDER SUMMARY =====
        const summarySheet = XLSX.utils.json_to_sheet(
            infoOrder.map((r, index) => ({
                "#": index + 1,
                "Order ID": r._id,
                "Ngày đặt": r.date,
                "Khách hàng": r.customerName,
                "SĐT": r.phone,
                "Phí ship": r.shippingFee,
                "Giảm giá": r.discount,
                "Tổng": r.total,
                "Trạng thái": r.status,
                "Vận đơn": r.trackingCode,
                "Đơn vị VC": r.shippingUnit,
                "Ghi chú": r.note,
            }))
        );

        // Set chiều rộng cột
        summarySheet["!cols"] = [
            { wch: 5 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 12 },
            { wch: 12 },
            { wch: 14 },
            { wch: 15 },
            { wch: 20 },
            { wch: 18 },
            { wch: 25 },
        ];


        // ===== SHEET 2: ORDER PRODUCTS =====
        const productSheet = XLSX.utils.json_to_sheet(
            reportProducts.map((p, index) => ({
                "#": index + 1,
                "Order ID": p.orderId,
                "Sản phẩm": p.productName,
                "SL": p.quantity,
                "Đơn giá": p.unitPrice,
                "Chi phí ship": p.shippingFee,
                "Thành tiền": p.total,
            }))
        );

        // Set chiều rộng cột
        productSheet["!cols"] = [
            { wch: 5 },
            { wch: 15 },
            { wch: 30 },
            { wch: 10 },
            { wch: 12 },
            { wch: 12 },
            { wch: 14 },
        ];


        // ===== CREATE WORKBOOK =====
        const workbook = XLSX.utils.book_new();

        // Thêm 2 sheet:
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Order Summary");
        XLSX.utils.book_append_sheet(workbook, productSheet, "Order Products");

        // Xuất file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, "WebOrders.xlsx");
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

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <select

                                    className="admin-select"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    style={{ width: "150px" }}
                                >
                                    <option>January 2025</option>
                                    <option>February 2025</option>
                                    <option>March 2025</option>
                                    <option>April 2025</option>
                                    <option>May 2025</option>
                                    <option>June 2025</option>
                                    <option>July 2025</option>
                                    <option>August 2025</option>
                                    <option>September 2025</option>
                                    <option>October 2025</option>
                                </select>

                                <select

                                    className="admin-select"
                                    style={{ width: "150px" }}
                                >
                                    {year
                                        .slice()
                                        .sort((a, b) => b - a)
                                        .map((yr) => (
                                            <option key={yr} value={yr}>{yr}</option>
                                        ))}

                                </select>
                            </div>
                        </div>

                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <XAxis dataKey="month" />

                            <YAxis
                                tickFormatter={(value) =>
                                    `${value.toLocaleString("vi-VN")}đ`

                                }
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #475569",
                                    color: "#fff",
                                    borderRadius: "8px",
                                }}
                                formatter={(value) =>
                                    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                                }
                                labelFormatter={(label) => `Tháng ${label}`}
                            />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#2563eb"
                                strokeWidth={3}
                            />
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
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="admin-btn admin-primary" onClick={handleExportExcel}>Export CSV</button>
                        <select

                            className="admin-select"
                            style={{ width: "250px" }}
                            value={selectedReportType}
                            onChange={(e) => setSelectedReportType(Number(e.target.value))}
                        >
                            <option value={1}>Thông tin tổng quan đơn hàng</option>
                            <option value={2}>Thống kê sản phẩm </option>

                        </select>

                    </div>


                </div>
                {/* 
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
                </table> */}

                {selectedReportType === 1 ? (<table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Ngày đặt</th>
                            <th>Khách hàng</th>
                            <th>SĐT</th>
                            <th>Phí ship</th>
                            <th>Giảm giá</th>
                            <th>Tổng</th>
                            <th>Trạng thái</th>
                            <th>Vận đơn</th>
                            <th>Đơn vị VC</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>

                    <tbody>
                        {infoOrder.map((r, index) => (
                            <tr key={r._id}>
                                <td>{index + 1}</td>
                                <td>{r._id}</td>
                                <td>{r.date}</td>
                                <td>{r.customerName}</td>
                                <td>{r.phone}</td>
                                <td>{r.shippingFee}</td>
                                <td>{r.discount}</td>
                                <td>{r.total}</td>
                                <td>{r.status}</td>
                                <td>{r.trackingCode}</td>
                                <td>{r.shippingUnit}</td>
                                <td>{r.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>) : (<table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Sản phẩm</th>
                            <th>SL</th>
                            <th>Đơn giá</th>
                            <th>Chi phí ship</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>

                    <tbody>
                        {infoOrder.map((p, index) => (
                            <tr key={p._id}>
                                <td>{index + 1}</td>
                                <td>{p._id}</td>
                                <td>{p.productName}</td>
                                <td>{p.quantity}</td>
                                <td>{p.unitPrice}₫</td>
                                <td>{p.shippingFee}₫</td>
                                <td>{p.total}₫</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}


            </section>
        </>
    );
}

export default ReportsAdmin;
