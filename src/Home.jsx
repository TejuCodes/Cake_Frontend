import React, { useEffect, useState } from 'react';
import "./App.css";
import Cake from './components/Cakes';
import Footer from './components/Footer';
import FeedbackForm from './components/FeedbackForm';
import creatorImg from '../src/assets/tejashwin.jpg';

const Home = () => {

  return (
    <>
      <div className='main_img'></div>
      <Cake />
      <FeedbackForm />
      <Footer />
    </>
  );
};

export default Home;
