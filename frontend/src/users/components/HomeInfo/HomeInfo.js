import React, { useState } from "react";
import "../../css/MainContent/homeInfo/homeInfo.css";


function HomeInfo() {
    const [stories, setStories] = useState([
        {
            id: 1,
            user: "Nguyễn Văn A",
            content: "Hôm nay trời thật đẹp 🌤️",
            image: "https://picsum.photos/id/1015/400/250",
            time: "2 giờ trước",
        },
        {
            id: 2,
            user: "Trần Thị B",
            content: "Một ngày bận rộn với dự án mới 💻",
            image: "https://picsum.photos/id/1021/400/250",
            time: "5 giờ trước",
        },
    ]);

    const [newStory, setNewStory] = useState({ content: "", image: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newStory.content) return;

        const newPost = {
            id: Date.now(),
            user: "Bạn",
            content: newStory.content,
            image: newStory.image || "https://picsum.photos/seed/random/400/250",
            time: "Vừa xong",
        };
        setStories([newPost, ...stories]);
        setNewStory({ content: "", image: "" });
    };


    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    // Xử lý thêm bình luận
    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, { id: Date.now(), text: newComment, user: 'User ' + Math.floor(Math.random() * 100) }]);
            setNewComment('');
        }
    };


    return (
        <>

            <div class="main-content col-xl-7 col-lg-9 col-md-9 col-sm-12 col-1" >
                <header className="home-topbar">
                    <div className="home-actions">
                        <button className="home-btn"> <i class="bi bi-bell" > </i></button>
                        <button className="home-btn"> <i class="bi bi-cloud"> </i></button>
                        <button className="home-btn home-primary">New</button>
                    </div>

                    <div className="home-topbar-right">
                        <div className="home-search">
                            <span><i class="bi bi-search"></i></span>
                            <input placeholder="Tìm người dùng, email, sản phẩm..." />
                        </div>

                    </div>
                </header>


                <section className="storyHome-container" style={{ marginTop: "20px" }}>
                    <div className="infoUser-home" >
                        <ul>
                            <li >
                                <div
                                    href="#"
                                    style={{ display: "flex", gap: "10px" }}
                                >
                                    <div className="contact-avatar-wrapper">
                                        <img
                                            className="contact-avatar"
                                            src="https://picsum.photos/id/1011/40/40"
                                        />

                                    </div>

                                    <div className="contact-info">
                                        <span className="contact-name">Lường Việt Nhật</span>

                                    </div>
                                </div>
                            </li>

                        </ul>

                    </div>
                    <div className="storyHome-grid">
                        {stories.map((story) => (
                            <>

                                <div key={story.id} className="storyHome-card">
                                    <img src={story.image} alt="story" className="storyHome-image" />
                                    <div className="storyHome-content">
                                        <h3>{story.user}</h3>
                                        <p>{story.content}</p>
                                        <span className="storyHome-time">{story.time}</span>
                                    </div>
                                </div>

                            </>
                        ))}
                    </div>

                    <div className="comment-section">
                        <div className="comments-list">
                            {comments.length === 0 ? (
                                <p className="no-comments">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment.id} className="comment">
                                        <strong>{comment.user}:</strong>
                                        <span>{comment.text}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <form className="comment-form" onSubmit={handleAddComment}>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Thêm bình luận..."
                                className="comment-input"
                            />
                            <button type="submit" className="submit-comment">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </section>

            </div>
        </>
    );
}
export default HomeInfo;