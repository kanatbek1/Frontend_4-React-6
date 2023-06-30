import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = data.map((object) => object.image);
        setImages(imageUrls);
      })
      .catch((error) => {
        console.log("Error fetching images:", error);
      });
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide( (prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slider-container">
      <button onClick={goToPrevSlide}>Назад</button>
      <img
        height="400px"
        width="400px"
        src={images[currentSlide]}
        alt={`Slide ${currentSlide}`}
      />
      <button onClick={goToNextSlide}>Далее</button>
    </div>
  );
};

export default App;
