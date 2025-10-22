import React, { useState, useEffect } from 'react';
import "../css/RightSidebar.css";
import ChatBox from './RightSidebars/ChatBox';
// demo ảnh qc
import image1 from "../../image/anhqc01.jpg"
import image2 from "../../image/anhqc02.jpg"




function RightSidebar() {

    const ads = [
        {
            img: image1,
            link: "https://duockienminh.vn/bot-chuoi-xanh-say-lanh",
        },
        {
            img: image2,
            link: "https://thegioiskinfood.com/collections/garnier",
        },

    ];
    const [currentAd, setCurrentAd] = useState(ads[0]);

    useEffect(() => {
        // Cứ 5 giây đổi quảng cáo 1 lần
        const interval = setInterval(() => {
            const randomAd = ads[Math.floor(Math.random() * ads.length)];
            setCurrentAd(randomAd);
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    const chats = [
        {
            id: "chat_1",
            type: "private",
            name: "Nguyễn Văn Bún",
            avatar: "https://picsum.photos/id/1011/40/40",
            lastMessage: "Bạn: Ok, hẹn gặp lại nhé!",
            isActive: true,
            status: "online"
        },
        {
            id: "chat_2",
            type: "private",
            name: "Trần Thị Phở",
            avatar: "https://picsum.photos/id/1022/40/40",
            lastMessage: "Phở: Ngủ sớm đi nha!",
            isActive: false,
            status: "offline"
        },
        {
            id: "chat_3",
            type: "private",
            name: "Phạm Văn Cơm",
            avatar: "https://picsum.photos/id/1045/40/40",
            lastMessage: "Cơm: Mai có lịch học không?",
            isActive: false,
            status: "online"
        },
        {
            id: "group_1",
            type: "group",
            nameGroup: "Nhóm Ăn Bà Bún",
            avatar: "https://picsum.photos/id/342/40/40",
            lastMessage: "Hôm nay ăn ở đâu đây?",
            unread: 3,
            isActive: true,
            members: [
                { id: "user_1", name: "Nguyễn Văn Bún", status: "online" },
                { id: "user_2", name: "Trần Thị Phở", status: "offline" },
                { id: "user_3", name: "Phạm Văn Cơm", status: "online" }
            ]
        },
        {
            id: "group_2",
            type: "group",
            nameGroup: "Team Lập Trình",
            avatar: "https://picsum.photos/id/456/40/40",
            lastMessage: "Ai push code chưa?",
            unread: 0,
            isActive: false,
            members: [
                { id: "user_4", name: "Hà Minh", status: "online" },
                { id: "user_5", name: "Lê Hùng", status: "offline" }
            ]
        },
        {
            id: "chat_4",
            type: "private",
            name: "Lê Thị Bánh Mì",
            avatar: "https://picsum.photos/id/1067/40/40",
            lastMessage: "Bánh Mì: Mai ăn sáng nhé?",
            isActive: false,
            status: "online"
        },
        {
            id: "chat_5",
            type: "private",
            name: "Đỗ Phở Cuốn",
            avatar: "https://picsum.photos/id/1083/40/40",
            lastMessage: "Phở Cuốn: Có bài tập chưa?",
            isActive: false,
            status: "offline"
        },
        {
            id: "chat_6",
            type: "private",
            name: "Ngô Thị Súp",
            avatar: "https://picsum.photos/id/1090/40/40",
            lastMessage: "Súp: Ngủ ngon nha!",
            isActive: false,
            status: "online"
        },
        {
            id: "chat_7",
            type: "private",
            name: "Trịnh Cơm Gà",
            avatar: "https://picsum.photos/id/1105/40/40",
            lastMessage: "Cơm Gà: Đi chơi cuối tuần không?",
            isActive: true,
            status: "online"
        },
        {
            id: "group_3",
            type: "group",
            nameGroup: "Fan Bún Đậu",
            avatar: "https://picsum.photos/id/310/40/40",
            lastMessage: "Đậu ở đâu là ngon nhất?",
            unread: 5,
            isActive: false,
            members: [
                { id: "user_6", name: "Lê Bún", status: "online" },
                { id: "user_7", name: "Hà Đậu", status: "offline" },
                { id: "user_8", name: "Trần Mắm Tôm", status: "online" }
            ]
        },
        {
            id: "group_4",
            type: "group",
            nameGroup: "Lớp Frontend 2025",
            avatar: "https://picsum.photos/id/378/40/40",
            lastMessage: "Submit bài tập chưa mọi người?",
            unread: 2,
            isActive: true,
            members: [
                { id: "user_9", name: "Nguyễn Văn JS", status: "online" },
                { id: "user_10", name: "Phạm CSS", status: "offline" }
            ]
        },
        {
            id: "chat_8",
            type: "private",
            name: "Phan Cháo Lòng",
            avatar: "https://picsum.photos/id/1111/40/40",
            lastMessage: "Cháo: Cuối tuần làm gì?",
            isActive: false,
            status: "offline"
        },
        {
            id: "chat_9",
            type: "private",
            name: "Nguyễn Thị Bò Kho",
            avatar: "https://picsum.photos/id/1120/40/40",
            lastMessage: "Bò Kho: Gặp lúc 5h nha!",
            isActive: true,
            status: "online"
        },
        {
            id: "group_5",
            type: "group",
            nameGroup: "Chuyên Lập Trình Backend",
            avatar: "https://picsum.photos/id/475/40/40",
            lastMessage: "Ai làm API auth rồi?",
            unread: 0,
            isActive: false,
            members: [
                { id: "user_11", name: "NodeJS", status: "online" },
                { id: "user_12", name: "ExpressJS", status: "offline" },
                { id: "user_13", name: "MongoDB", status: "online" }
            ]
        },
        {
            id: "chat_10",
            type: "private",
            name: "Hồ Thị Bánh Canh",
            avatar: "https://picsum.photos/id/1133/40/40",
            lastMessage: "Bánh Canh: Rảnh gọi tớ nha!",
            isActive: false,
            status: "offline"
        }
    ];


    const [chatBox, setChatBox] = useState([]);

    const handleShowChat = (chat) => {
        setChatBox((prev) => {
            const exists = prev.find((item) => item.id === chat.id);
            if (exists) {
                const newList = [...prev.filter((item) => item.id !== chat.id), chat];
                return newList;
            } else {
                const newList = [...prev, chat];
                return newList.slice(-3);
            }
        });
    };

    const handleCloseChat = (id) => {
        setChatBox((prev) => prev.filter((chat) => chat.id !== id));
    };







    return (


        <aside className="right-sidebar col-xl-2 col-lg-3 col-md-3">

     
            <div className="sidebar-search" style={{ marginTop: '20px' }}>
                <input type="text" placeholder="Tìm kiếm bạn bè..." />
            </div>

            <div className='sidebar' >
                <div className="contact-list" >
                    <h3>Liên Hệ Gần Đây</h3>
                    <ul>
                        {chats
                            .filter(chat => chat.type === "private")
                            .map(chat => (
                                <li key={chat.id} onClick={() => handleShowChat(chat)}>
                                    <div
                                        href="#"
                                        className={`contact-item ${chat.isActive ? "active" : ""}`}
                                    >
                                        <div className="contact-avatar-wrapper">
                                            <img
                                                className="contact-avatar"
                                                src={chat.avatar}
                                                alt={chat.name}
                                            />
                                            <span className={`status-dot ${chat.status}`}></span>
                                        </div>

                                        <div className="contact-info">
                                            <span className="contact-name">{chat.name}</span>
                                            <span className="last-message">{chat.lastMessage}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>

                    {/* Nhóm trò chuyện */}
                    <h3>Nhóm Trò Chuyện</h3>
                    <ul>
                        {chats
                            .filter(chat => chat.type === "group")
                            .map(chat => (
                                <li key={chat.id} onClick={handleShowChat}>
                                    <div
                                        href="#"
                                        className={`group-item ${chat.isActive ? "active" : ""}`}
                                    >
                                        <img
                                            className="contact-avatar"
                                            src={chat.avatar}
                                            alt={chat.name}
                                        />
                                        <div className="group-info">
                                            <div className="group-header">
                                                <span className="group-name">{chat.name}</span>
                                                {chat.unread > 0 && (
                                                    <span className="unread-badge">{chat.unread}</span>
                                                )}
                                            </div>
                                            <span className="last-message">{chat.lastMessage}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {/* <div class="ad-box">
                <a href={currentAd.link} target="_blank" rel="noopener noreferrer">
                    <img src={currentAd.img} alt="Quảng cáo" />
                </a>
            </div>
 */}



            <ChatBox chatList={chatBox} onClose={handleCloseChat} />


        </aside>


    );
}

export default RightSidebar;