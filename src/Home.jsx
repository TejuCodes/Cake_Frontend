import React from 'react';
import "./App.css";
import Cake from './components/Cakes';
import Footer from './components/Footer';
import FeedbackForm from './components/FeedbackForm';

const Home = ({ user }) => {
  return (
    <>
      
      <div className='main_img'>
      </div>
      <Cake />
      <FeedbackForm/>
      <Footer />
    </>
  );
};

export default Home;