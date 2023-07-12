import React, { useState, useEffect } from "react";


const SlideShow = ({ images, interval = 4000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const nextSlide = () => {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    }
    
    const prevSlide = () => {
      setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    }

    useEffect(() => {
    
        const slideTimer = setInterval( () => {
            nextSlide();
        }, interval);
        return () => {
            clearInterval(slideTimer);
        };
    }, [currentIndex, interval]);
    
    return (
      <div className="slide">
        <button className="button-prev" onClick={prevSlide}>Previous</button>
        <img src={images[currentIndex]} alt="Slide" />
        <button className="button-next" onClick={nextSlide}>Next</button>
      </div>
    );
  }
  
  export default SlideShow;