import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Container = ({ children }) => {
  return (
    <div className='flex flex-col'>
      <Header />
      <div className='py-8'>{children}</div>
      <Footer />
    </div>
  );
};

export default Container;
