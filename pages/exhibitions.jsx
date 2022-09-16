import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Container from '../layouts/Container';
import useExhibitions from '../hooks/useExhibitions';
import { motion } from 'framer-motion';

const Exhibitions = () => {
  const router = useRouter();
  const exhibitions = useExhibitions();

  const variants = {
    'initial': {
      opacity: 0,
    },
    'enterView': {
      opacity: 1,
    },
    'hover': {
      opacity: 1,
    },
  };

  const variantsChild = {
    'hover': { opacity: 1, x: 0, transition: { duration: 0.2 } },
    'initial': { opacity: 0, x: '-2%', transition: { duration: 0.2 } },
  };

  return (
    <Container>
      <div className='flex flex-col gap-8'>
        <div className='border-y border-y-white border-solid flex flex-col gap-4 p-8 h-50-screen sm:h-30-screen'>
          <p className='font-bebas text-3xl sm:text-4xl'>Exhibiciones</p>
          <p className='text-md sm:text-lg'>Regresa a la historia e ingresa a conocer nuestras exhibiciones</p>
          <div></div>
        </div>
        {exhibitions &&
          exhibitions.map((item) => {
            return (
              <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }} key={item.id_exhibition + item.name_exhibition} className='relative border-y border-y-white border-solid sm:h-40-screen h-80-screen flex flex-col justify-between items-start'>
                <Image className='object-cover w-full -z-10' src={item.image} alt='cyberpunk city art' layout='fill' />
                <motion.div className='flex flex-col justify-start items-start gap-4 z-20 relative w-full h-full p-8 bg-black bg-opacity-40 text-white' initial='initial' whileInView='enterView' whileHover='hover' whileTap='hover' whileDrag='hover' variants={variants} viewport={{ amount: 0.5 }}>
                  <p className='font-bebas text-3xl sm:text-4xl'>{item.name_exhibition}</p>
                  <p className='text-md sm:text-xl'>{item.author}</p>
                  <motion.div className='flex flex-col justify-start items-start gap-2 flex-wrap h-60-screen sm:h-20-screen w-full' variants={variantsChild}>
                    {item.information.split('\n').map((text, index) => {
                      return (
                        <p className='text-md sm:text-md mr-8 w-full [maxWidth:40%] sm:[maxWidth:40%] break-normal' key={index}>
                          {text.replace('\n', '.')}
                        </p>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
      </div>
    </Container>
  );
};

export default Exhibitions;
