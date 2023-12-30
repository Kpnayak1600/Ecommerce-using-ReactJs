import React, { useState } from "react";
import "./ProductCard.css";

const StarIcon = () => (
  <span role="img" aria-label="star" className="star-icon">
    ⭐
  </span>
);

const ProductCard = ({ product, addToCart }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(product.rating); // Round the rating to the nearest integer

    for (let i = 0; i < 5; i++) {
      // Display full stars up to the rounded rating value
      if (i < roundedRating) {
        stars.push(<StarIcon key={i} />);
      } else {
        // Display empty stars for the remaining positions
        stars.push(<StarIcon key={i} style={{ opacity: 0.5 }} />);
      }
    }

    return stars;
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail} style={{ height: "30%", margin: "5%" }} />
      <div className="image-container">
        <button
          className="nav-button left"
          onClick={prevImage}
          disabled={currentImage === 0}
        >
          {"<"}
        </button>
        <img
          className="thumbnail"
          src={product.images[currentImage]}
          alt={`${product.title} - Image ${currentImage + 1}`}
        />
        <button
          className="nav-button right"
          onClick={nextImage}
          disabled={currentImage === product.images.length - 1}
        >
          {">"}
        </button>
      </div>
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="brand">Brand: {product.brand}</p>
        <p className="stock">Stock: {product.stock}</p>
        <p className="discount">Discount: {product.discountPercentage}%</p>
        <p className="price">Price: ${product.price.toFixed(2)}</p>
        <p className="category">Category: {product.category}</p>
        <p className="rating">Rating: {renderStars()}</p>
        <p className="description">Description: {product.description}</p>
        <button onClick={() => addToCart(product.id)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
