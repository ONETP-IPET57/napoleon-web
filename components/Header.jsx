import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-8 p-8 justify-start sm:justify-between items-center'>
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link href={'/'}>
          <h1 className='font-bebas text-3xl'>NAPOLEÓN</h1>
        </Link>
        <button className='hidden sm:inline-block'>Entradas</button>
      </div>
      <div className='flex flex-row justify-center items-center'>
        <button>Visitas</button>
      </div>
    </div>
  );
};

export default Header;
