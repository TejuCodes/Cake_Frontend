import React from "react";
import "../App.css"; // Ensure your CSS file is linked

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* About Section */}
          <div className="footer-about">
            <h5>About Us</h5>
            <p style={{color:"white"}}> Our bakery chain serves the best cakes, pastries, cookies, and fresh delicacies across multiple cities including Chennai, Coimbatore, Trichy, and Madurai.
            </p>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h5>Contact Us</h5>
            <p><i className="fas fa-map-marker-alt"></i> 11th cross thillai nagar , tichy </p>
            <p><i className="fas fa-phone"></i> +91 779550063</p>
            <p><i className="fas fa-envelope"></i> info@cakeA2C.com</p>
            <div className="footer-social">
              <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          {/* Google Map Section */}
          <div className="footer-map">
            <iframe
              className="gmap_iframe"
              width="100%"
              height="250"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=11th cross thillai nagar trichy&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Google Map"
            ></iframe>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom" >
          <p style={{color:"white"}}> &copy; 2025 A2C Cakes. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;