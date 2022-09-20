import { motion } from 'framer-motion';
import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Container = ({ children }) => {
  const [menuVisibility, setMenuVisibility] = useState(false);

  const toggleMenuVisibility = useCallback(() => setMenuVisibility(!menuVisibility), [menuVisibility]);

  const variants = {
    hidden: { opacity: 0, x: '-100%' },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
  };

  return (
    <>
      <Head>
        <title>NAPOLEÓN</title>
      </Head>
      <div className='flex flex-col overflow-x-hidden'>
        <Header toggleMenuVisibility={toggleMenuVisibility} />
        <motion.div className='py-8' key={'main-container'} initial='hidden' animate='enter' exit='exit' variants={variants} transition={{ type: 'linear', duration: 0.25 }}>
          {children}
        </motion.div>
        <Footer />
      </div>
      <Menu visibility={menuVisibility} toggleMenuVisibility={toggleMenuVisibility} />
    </>
  );
};

export default Container;
