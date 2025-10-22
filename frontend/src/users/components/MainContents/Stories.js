

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/MainContent/Stories.css";
function Stories() {
  const navigate = useNavigate();
  const scrollRef = useRef();

  const stories = [...Array(18)].map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    avatar: `https://picsum.photos/id/${i + 1000}/100/100`,
  }));

  const handleClick = (story) => {
    navigate(`/profile/${story.id}`, { state: { story } });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="stories-wrapper">
      <button className="arrow-btn left" onClick={scrollLeft}>
        ❮
      </button>
      
      <div className="stories-section" ref={scrollRef}>
        {stories.map((story) => (
          <div
            key={story.id}
            className="story-card"
            onClick={() => handleClick(story)}
          >
            <img
              src={story.avatar}
              alt={story.name}
              className="story-avatar"
            />
            <p className="story-name">{story.name}</p>
          </div>
        ))}
      </div>
        <button className="arrow-btn right" onClick={scrollRight}>
        ❯
      </button>
      
    </div>
  );
}

export default Stories;
