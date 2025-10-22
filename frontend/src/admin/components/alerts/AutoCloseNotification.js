import React, { useState, useEffect } from "react";
import "../../css/alerts/AutoCloseNotification.css";

function AutoCloseNotification({ message, onClose }) {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState("show");

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setFade("hide");
        setTimeout(() => {
          setShow(false);
          if (onClose) onClose();
        }, 500);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`notification center ${fade}`}>
      <span>{message}</span>
    </div>
  );
}

export default AutoCloseNotification;
