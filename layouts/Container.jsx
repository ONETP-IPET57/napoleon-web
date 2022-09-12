import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Container = ({ children }) => {
  return (
    <div className='flex flex-col'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Container;
