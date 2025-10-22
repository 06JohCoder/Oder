// VideoPage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
//Loading frontend 
import Loading from '../helps/Loading.js';
// Đảm bảo bạn đã import file CSS
import '../css/pages/video.css'; 

// DỮ LIỆU MẪU (Giả sử bạn có đủ 23 video)
const ALL_VIDEOS = [
  { id: 2, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217", title: "Big Buck Bunny" },
  { id: 3, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "https://orange.blender.org/wp-content/themes/orange/images/header.jpg", title: "Elephants Dream" },
  { id: 4, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://i.ytimg.com/vi/Dr91pg6_sd8/maxresdefault.jpg", title: "Ngọn lửa bùng cháy" },
  { id: 5, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "https://i.ytimg.com/vi/d-h21m_h_wI/maxresdefault.jpg", title: "Cuộc tẩu thoát vĩ đại" },
  { id: 6, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "https://i.ytimg.com/vi/E_h4Ank8s_k/maxresdefault.jpg", title: "Niềm vui bất tận" },
  { id: 7, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", poster: "https://i.ytimg.com/vi/S-1-w8g_jmw/maxresdefault.jpg", title: "Chuyến đi đầy hứng khởi" },
  { id: 8, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", poster: "https://i.ytimg.com/vi/x3n2i6a9A-s/maxresdefault.jpg", title: "Sự tan chảy ngoạn mục" },
  { id: 9, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", poster: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Sintel_poster.jpg", title: "Sintel - Nữ chiến binh" },
  { id: 10, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4", poster: "https://www.subaru.com/content/dam/subaru/videos/2014/outback/14_out_int_psngr_prtctn.jpg", title: "Quảng cáo Subaru Outback 2014" },
  { id: 11, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", poster: "https://mango.blender.org/wp-content/uploads/2012/05/poster_1_big.jpg", title: "Tears of Steel" },
  { id: 12, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", poster: "https://i.ytimg.com/vi/k6Ta_2g4Tzo/maxresdefault.jpg", title: "Hành trình Bullrun" },
  { id: 13, src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", poster: "https://i.ytimg.com/vi/vTTyqgL2eX4/maxresdefault.jpg", title: "Mua xe với 1000 đô la" },
  { id: 14, src: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4", poster: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg", title: "Bình minh trên núi" },
  { id: 15, src: "https://storage.googleapis.com/coverr-main/mp4/Self-Care.mp4", poster: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg", title: "Chăm sóc bản thân" },
  { id: 16, src: "https://storage.googleapis.com/coverr-main/mp4/Night-lights.mp4", poster: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg", title: "Ánh đèn thành phố về đêm" },
  { id: 17, src: "https://storage.googleapis.com/coverr-main/mp4/Oranges.mp4", poster: "https://images.pexels.com/photos/5945763/pexels-photo-5945763.jpeg", title: "Vườn cam trĩu quả" },
  { id: 18, src: "https://storage.googleapis.com/coverr-main/mp4/See%20The%20World.mp4", poster: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg", title: "Ngắm nhìn thế giới" },
  { id: 19, src: "https://storage.googleapis.com/coverr-main/mp4/Tractor-crossing-a-bridge.mp4", poster: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg", title: "Máy cày qua cầu" },
  { id: 20, src: "https://storage.googleapis.com/coverr-main/mp4/Goat.mp4", poster: "https://images.pexels.com/photos/162318/chevre-cabra-capra-hircus-162318.jpeg", title: "Chú dê trên núi" },
  { id: 21, src: "https://storage.googleapis.com/coverr-main/mp4/Balcony-I.mp4", poster: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg", title: "View từ ban công" },
  
];
const VIDEOS_PER_PAGE = 3; // Giảm số lượng để dễ thấy hiệu ứng cuộn hơn

// =================================================================
// Component con cho từng video (Đã cập nhật JSX và logic)
// =================================================================

function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 1000)); // Số like ngẫu nhiên ban đầu
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  // Xử lý autoplay khi video vào khung nhìn
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("entries",entries);
        const entry = entries[0];
        
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch((error) => console.log("Lỗi autoplay bị chặn:", error));
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.7 } // Video phải hiển thị 70% mới chạy
    );

    const currentVideoRef = videoRef.current;
    if (currentVideoRef) observer.observe(currentVideoRef);
    return () => { if (currentVideoRef) observer.unobserve(currentVideoRef); };
  }, []);

  // Xử lý nút Like
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // Xử lý thêm bình luận
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, user: 'User ' + Math.floor(Math.random() * 100) }]);
      setNewComment('');
    }
  };

  // Xử lý chia sẻ (sao chép link)
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Đã sao chép liên kết trang!');
    });
  };

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        className="video-player"
        src={src}
        poster={poster}
        controls
        muted
        loop
        playsInline
      />
      <div className="video-content">
        <div className="video-header">
          <h3 className="video-title">{title}</h3>
          <p className="video-author">Tác giả: React Developer</p>
        </div>

        <div className="video-actions">
          <button className={`action-button ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
             <i class="bi bi-heart"></i>
            <span>{likeCount}</span>
          </button>
          <button className="action-button">
            <i class="bi bi-chat-dots"></i>
            <span>{comments.length}</span>
          </button>
          <button className="action-button" onClick={handleShare}>
           <i class="bi bi-share"></i>
            <span>Chia sẻ</span>
          </button>
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
      </div>
    </div>
  );
}

// =================================================================
// Component chính của trang (Không thay đổi nhiều)
// =================================================================
function VideoPage() {
    // ...Phần logic state và fetch data giữ nguyên như cũ...
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  
    const fetchVideos = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const startIndex = page * VIDEOS_PER_PAGE;
        const newVideosData = ALL_VIDEOS.slice(startIndex, startIndex + VIDEOS_PER_PAGE);
    
        if (newVideosData.length > 0) {
            setVideos((prev) => [...prev, ...newVideosData]);
            setPage((prev) => prev + 1);
        } else {
            setHasMore(false);
        }
        setIsLoading(false);
    }, [page, isLoading, hasMore]);
  
    useEffect(() => {
        fetchVideos();
    }, []); // Chỉ gọi lần đầu
  
    const observer = useRef();
    const lastVideoElementRef = useCallback((node) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchVideos();
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, fetchVideos]);

  return (
    <div className=" main-content col-xl-6 col-lg-9 col-md-9 col-sm-12 col-12">
      <main className="video-main-feed">
        {videos.map((video, index) => (
          <div ref={videos.length === index + 1 ? lastVideoElementRef : null} key={video.id}>
            <VideoPlayer {...video} />
          </div>
        ))}
        {isLoading && <div className="loading-indicator"><Loading/></div>}
        {!hasMore && <div className="loading-indicator">Bạn đã xem hết video!</div>}
      </main>
    </div>
  );
}

export default VideoPage;