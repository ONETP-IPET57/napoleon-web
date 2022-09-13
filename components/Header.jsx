import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

const Header = () => {
  return (
    <div className='flex flex-col px-8'>
      <div className='flex flex-row gap-8 py-8 justify-start sm:justify-between items-center border-b border-solid border-b-grey-500'>
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link href={'/'}>
          <h1 className='font-bebas text-5xl'>NAPOLEÓN</h1>
        </Link>
        <button className='hidden sm:inline-block'>Entradas</button>
      </div>
      <div className='flex flex-row py-4 px-8 gap-4 justify-center items-center border-b border-solid border-b-grey-500'>
        <motion.button initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} className='uppercase'>
          Visitas
        </motion.button>
        <motion.button initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} className='uppercase'>
          Exploracion
        </motion.button>
        <motion.button initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }} className='uppercase'>
          Programacion
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
