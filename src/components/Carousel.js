import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';

const Carousel = ({ children }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const totalChildren = React.Children.count(children);
  const [transition, setTransition] = useState(true);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (!isScrolling) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => {
          if (index === totalChildren) {
            setTransition(false);
            setIndex(0);
          } else {
            setTransition(true);
            setIndex((prevIndex) => prevIndex + 1);
          }
        },
        3000
      );

      return () => {
        resetTimeout();
      };
    }
  }, [index, isScrolling, totalChildren]);

  const handleScroll = () => {
    setIsScrolling(true);
    resetTimeout();
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
  };

  return (
    <div className="carousel" onScroll={handleScroll} onMouseLeave={handleScrollEnd}>
      <div
        className="carousel-items"
        style={{
          transform: `translateX(${-(index + 1) * 100}%)`,
          transition: transition ? 'transform 0.5s ease-in-out' : 'none'
        }}
        onTransitionEnd={() => {
          if (index === totalChildren) {
            setTransition(false);
            setIndex(0);
          } else if (index === -1) {
            setTransition(false);
            setIndex(totalChildren - 1);
          }
        }}
      >
        <div className="carousel-item">
          {React.Children.toArray(children)[totalChildren - 1]}
        </div>
        {React.Children.map(children, (child, i) => (
          <div key={i} className="carousel-item">
            {child}
          </div>
        ))}
        <div className="carousel-item">
          {React.Children.toArray(children)[0]}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
