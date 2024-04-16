// CelebratoryEmojis.js
import React, { useState } from "react";

const CelebratoryEmojis = () => {
  const [emojis, setEmojis] = useState([]);

  const handleCelebrate = () => {
    const emojisList = ["😃", "🎉", "🥳", "🎈", "🎊", "👏", "🙌", "🎆"];

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        setEmojis((prevEmojis) => [
          ...prevEmojis,
          {
            id: Date.now() + i,
            emoji: emojisList[Math.floor(Math.random() * emojisList.length)],
            top: Math.random() * 100,
            left: Math.random() * 100,
          },
        ]);
      }, i * 100); // Spread the emojis over 5 seconds
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {emojis.map(({ id, emoji, top, left }) => (
        <div
          key={id}
          style={{
            position: "absolute",
            top: `${top}vh`,
            left: `${left}vw`,
            fontSize: "2em",
            animation: "bounce 2s ease infinite alternate",
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default CelebratoryEmojis;
