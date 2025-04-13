import React, { useEffect, useState } from 'react';
import "./App.css";
import Cake from './components/Cakes';
import Footer from './components/Footer';
import FeedbackForm from './components/FeedbackForm';
import creatorImg from '../src/assets/tejashwin.jpg';

const Home = ({ user }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-window">
            <img src={creatorImg} alt="Creator" className="creator-img" />
            <h2>Project Credits</h2>
            <p>Developed by: <strong>TEJASHWIN S</strong></p>
            <p>
              🔒 Disclaimer: This is a testing project created for learning purposes only.
              ⚠️ Please do not enter any real personal information.
            </p>
            <p>Contact: <strong><a href='https://www.linkedin.com/in/tejashwin2004/' target="_blank" rel="noopener noreferrer">LinkedIn</a></strong></p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}

      <div className='main_img'></div>
      <Cake />
      <FeedbackForm />
      <Footer />
    </>
  );
};

export default Home;
