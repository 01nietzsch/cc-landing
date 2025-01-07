import React, { useRef, useEffect } from "react";

export default function LightNode({ position }) {
  const element = useRef(null);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    const node = element.current;
    node.style.transition = "all 5000ms linear"; // Smooth, longer transitions
    node.style.backgroundColor = "rgba(0, 0, 255, 0.2)"; // Default blue color

    function animate() {
      if (position === "top-left") {
        node.style.top = `${randomIntFromInterval(5, 25)}%`;
        node.style.left = `${randomIntFromInterval(5, 15)}%`;
      } else if (position === "bottom-right") {
        node.style.bottom = `${randomIntFromInterval(5, 25)}%`;
        node.style.right = `${randomIntFromInterval(5, 15)}%`;
      }

      // Keep the light node always visible
      node.style.opacity = "1"; // Always fully visible

      setTimeout(animate, 5000); // Change position every 5 seconds
    }

    animate();
  }, [position]);

  return <span ref={element} className="lightNode"></span>;
}
