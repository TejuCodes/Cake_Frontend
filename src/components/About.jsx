import React from "react";
import "../App.css"; // Import the CSS file
import aboutImage from "../assets/img/Untitled design.png"; // Replace with your image path
import Footer from "./Footer";

const About = () => {
  return (
    <>
    <div className="about-container">
      <div className="about-card">
        <div className="about-content">
          <div className="about-text-section">
            <h1 className="about-title">About Our Cake Shop 🎂</h1>
            <p className="about-description">
              Welcome to <strong>Sweet Delights</strong>, your go-to place for delicious and freshly baked cakes! 
              Our passion is to craft the finest cakes with love and the best ingredients.  
            </p>

            <h2 className="about-subtitle">Our Story 🍪</h2>
            <p className="about-text">
              Founded in 2024, we started as a small home-based bakery, spreading happiness one cake at a time.
              Today, we serve hundreds of customers, making birthdays, weddings, and celebrations extra special.  
            </p>

            <h2 className="about-subtitle">Why Choose Us? 🌟</h2>
            <ul className="about-list">
              <li>Freshly baked cakes every day 🍞</li>
              <li>100% natural ingredients 🌿</li>
              <li>Custom designs for every occasion 🎨</li>
              <li>Fast delivery to your doorstep within 2hr near  <mark>TRICHY </mark>🚚</li>
            </ul>

            <h2 className="about-subtitle">Visit Us 🏠</h2>
            <p className="about-text about-address">
              📍 11th Cross , Thillai Nagar, Trichy   
              <br />
              📞 Contact: (+91) 7795500636  
            </p>
          </div>

          <div className="about-image-section">
            <img src={aboutImage} alt="About Us" className="about-image" />
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;