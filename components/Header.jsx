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
    <div className='flex flex-col px-8'>
      <div className='flex flex-row gap-8 py-8 justify-start sm:justify-center items-center border-b border-solid border-b-grey-500'>
        <div className='w-auto sm:w-1/6 flex justify-start'></div>
        <Link href={'/'}>
          <h1 className='font-bebas text-5xl flex-1 text-center'>NAPOLEÓN</h1>
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
    </div>
  );
};

export default Header;
