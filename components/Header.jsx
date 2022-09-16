import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import React from 'react';
import User from './User';

const Header = () => {
  const router = useRouter();

  return (
    <header className='flex flex-col'>
      <div className='flex flex-row gap-8 p-8 justify-center items-center border-b border-solid border-b-grey-500'>
        <div className='w-auto sm:w-1/6 sm:flex justify-start hidden'></div>
        <Link href={'/'}>
          <h1 className='font-bebas text-5xl flex-1 text-start sm:text-center'>NAPOLEÓN</h1>
        </Link>
        <div className='w-auto sm:w-1/6'>
          <User />
        </div>
      </div>
      <div className='flex flex-row py-4 px-8 gap-4 justify-center items-center border-b border-solid border-b-grey-500'>
        <motion.button initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }} className='uppercase' onClick={() => router.push('/guided_tours')}>
          Visitas
        </motion.button>
        <motion.button initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }} className='uppercase' onClick={() => router.push('/exhibitions')}>
          Exhibiciones
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
