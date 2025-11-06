import Loading from "../../helpers/loading";

function Cloud() {

    return (
        <>


            <div className="admin-page-title">

                <Loading message={" Admin đang lên lịch làm việc vui lòng quay lại sau... "} />

            </div>


            {/* import React from "react";

            

            export default function WorkBoard() {
  const days = [
            {key: "mon", label: "Thứ 2" },
            {key: "tue", label: "Thứ 3" },
            {key: "wed", label: "Thứ 4" },
            {key: "thu", label: "Thứ 5" },
            {key: "fri", label: "Thứ 6" },
            {key: "sat", label: "Thứ 7" },
            {key: "sun", label: "Chủ nhật" },
            ];

            const today = new Date();
  const pad = (n) => String(n).padStart(2, "0");
            const day = pad(today.getDate());
            const month = pad(today.getMonth() + 1);
            const year = today.getFullYear();

            return (
            <div
                className="min-h-screen p-8 flex items-start justify-center"
                style={{ background: "linear-gradient(180deg,#071029 0%, #081428 100%)" }}
            >
                <div className="w-full max-w-6xl">
                    <header className="mb-8 text-white">
                        <h1 className="text-3xl font-semibold">Bảng làm việc tuần</h1>
                        <p className="mt-2 text-slate-300">Giao diện React đơn giản, chủ đạo màu nền gradient, các khối thứ 2 → chủ nhật màu trắng.</p>
                    </header>

                    <main>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            
                            <div className="col-span-1 lg:col-span-2 bg-white/6 backdrop-blur-md rounded-2xl p-6 border border-white/6 shadow-lg">
                                <h2 className="text-white text-xl font-medium mb-4">Tổng quan tuần</h2>
                                <p className="text-slate-200">Sử dụng các khối bên cạnh để theo dõi từng ngày. Các khối từ Thứ 2 đến Chủ nhật là màu trắng để dễ theo dõi.</p>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <div className="rounded-lg bg-white/8 p-3 text-center">
                                        <div className="text-xs text-slate-300">Hôm nay</div>
                                        <div className="text-white font-semibold text-lg">{`${day}/${month}/${year}`}</div>
                                    </div>
                                    <div className="rounded-lg bg-white/8 p-3 text-center">
                                        <div className="text-xs text-slate-300">Tuần</div>
                                        <div className="text-white font-semibold text-lg">{`Tuần ${getWeekNumber(today)}`}</div>
                                    </div>
                                    <div className="rounded-lg bg-white/8 p-3 text-center">
                                        <div className="text-xs text-slate-300">Năm</div>
                                        <div className="text-white font-semibold text-lg">{year}</div>
                                    </div>
                                </div>
                            </div>

                    
                            {days.map((d) => (
                                <div key={d.key} className="bg-white rounded-2xl p-5 shadow-md border">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-slate-800 font-semibold">{d.label}</h3>
                                        <div className="text-xs text-slate-500">{d.key === getDayKey(today) ? "Hôm nay" : ""}</div>
                                    </div>

                                    <table className="w-full text-left table-fixed">
                                        <thead>
                                            <tr>
                                                <th className="text-xs text-slate-500 pb-2">Ngày</th>
                                                <th className="text-xs text-slate-500 pb-2">Tháng</th>
                                                <th className="text-xs text-slate-500 pb-2">Năm</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="pt-1 pb-1 font-medium">{day}</td>
                                                <td className="pt-1 pb-1 font-medium">{month}</td>
                                                <td className="pt-1 pb-1 font-medium">{year}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <hr className="my-4" />
                                    <textarea
                                        placeholder="Ghi chú công việc..."
                                        className="w-full resize-none h-24 p-3 text-sm border rounded-md focus:outline-none focus:ring"
                                    />

                                    <div className="mt-3 flex justify-between items-center">
                                        <button className="px-3 py-1 text-sm rounded-md bg-slate-100 text-slate-800">Thêm</button>
                                        <div className="text-xs text-slate-500">0 nhiệm vụ</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>

                    <footer className="mt-8 text-slate-400 text-sm">Giao diện mẫu — có thể chỉnh sửa để thêm dữ liệu động hoặc kết nối API.</footer>
                </div>
            </div>
            );
}

           
  const map = {
                0: "sun",
            1: "mon",
            2: "tue",
            3: "wed",
            4: "thu",
            5: "fri",
            6: "sat",
  };
            return map[date.getDay()];
}

            function getWeekNumber(d) {

  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            const dayNum = date.getUTCDay() || 7;
            date.setUTCDate(date.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
            return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
}

       */}


        </>
    )

}

export default Cloud;


