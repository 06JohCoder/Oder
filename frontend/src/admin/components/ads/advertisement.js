import "../../css/ads/advertisement.css";
import { useRef, useState } from "react";

function Advertisement() {

    // ===== ADS 1 =====
    const ads1Ref = useRef([]);
    const [ads1Count, setAds1Count] = useState(1);

    const addAds1 = () => {
        if(ads1Count >= 7){
            alert("Chỉ được thêm tối đa 7 ảnh quảng cáo!");
            return;
        }
        setAds1Count(prev => prev + 1);
    };

    // ===== ADS 2 =====
    const ads2Ref = useRef([]);

    const handleSave = () => {
        // const ads1 = ads1Ref.current.map(input => input?.value || "");
        // const ads2 = ads2Ref.current.map(input => input?.value || "");

        // console.log("ADS 1:", ads1);
        // console.log("ADS 2:", ads2);

        // call API ở đây
    };

    return (
        <>
            <h2>Quản lý quảng cáo</h2>

            <div className="advertisement">
                <div className="advertisement-container">

                    {/* ========== ADS LEFT ========= */}
                    <div className="ads-left">
                        <img
                            src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/23/1084128/Isushi.jpeg"
                            alt="ads-1"
                            className="ads-img"
                        />

                        <div className="ads-left-info">
                            <div className="info-img_Setting">
                                Quảng cáo 1 _
                                <span style={{ fontWeight: "bold", color: "red" }}>
                                    1960 X 1200
                                </span>
                            </div>

                            <button
                                className="admin-select"
                                style={{ marginTop: "10px" }}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#ads_1"
                            >
                                Thay đổi quảng cáo
                            </button>
                        </div>

                        <div className="col" style={{ position: "absolute", top: "120px", width: "99%" }}>
                            <div className="collapse multi-collapse" id="ads_1">
                                <div className="card card-body" style={{  width: "99%"}}>

                                    {[...Array(ads1Count)].map((_, index) => (
                                        <input
                                            key={index}
                                            ref={el => ads1Ref.current[index] = el}
                                            type="text"
                                            className="form-control"
                                            placeholder={`Link ảnh quảng cáo ${index + 1}`}
                                            style={{
                                                width: "100%",
                                                marginTop: index === 0 ? "0" : "10px"
                                            }}
                                        />
                                    ))}

                                    <button
                                        className="btn-accent"
                                        style={{ marginTop: "10px" }}
                                        onClick={addAds1}
                                    >
                                        Thêm ảnh quảng cáo
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========== ADS RIGHT ========= */}
                    <div className="ads-right">

                        {/* ADS 2 */}
                        <div className="ads-right-top">
                            <img
                                src="https://cdn.tgdd.vn/2024/05/banner/800-200-800x200-10.png"
                                alt="ads-2"
                                className="ads-img-right"
                            />

                            <div className="ads-right-top-info">
                                <div className="info-img_Setting">
                                    Quảng cáo 2 _
                                    <span style={{ fontWeight: "bold", color: "red" }}>
                                        800 X 200
                                    </span>
                                </div>

                                <button
                                    className="admin-select"
                                    style={{ marginTop: "10px" }}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#ads_2"
                                >
                                    Thay đổi quảng cáo
                                </button>
                            </div>

                            <div className="col" style={{ position: "absolute", zIndex: 1, top: "100px", width: "96%" }}>
                                <div className="collapse multi-collapse" id="ads_2">
                                    <div className="card card-body"  style={{  width: "100%"}}>

                                        {[0, 1].map((_, index) => (
                                            <input
                                                key={index}
                                                ref={el => ads2Ref.current[index] = el}
                                                type="text"
                                                className="form-control"
                                                placeholder={`Link ảnh quảng cáo ${index + 1}`}
                                                style={{
                                                    width: "100%",
                                                    marginTop: index === 0 ? "0" : "10px"
                                                }}
                                            />
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ADS 3 */}
                        <div className="ads-right-bottom" style={{ marginTop: "20px" }}>
                            <img
                                src="https://cdn.tgdd.vn/2024/05/banner/800-200-800x200-12.png"
                                alt="ads-3"
                                className="ads-img-right"
                            />
                        </div>
                    </div>

                </div>

                <button
                    className="btn-accent"
                    style={{ marginTop: "20px" }}
                    onClick={handleSave}
                >
                    Lưu thay đổi
                </button>
            </div>
        </>
    );
}

export default Advertisement;
