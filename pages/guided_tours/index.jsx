import React from 'react';
import Image from 'next/image';
import Container from '../../layouts/Container';
import useGuidedTours from '../../hooks/useGuidedTours';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const GuidesTours = () => {
  const router = useRouter();
  const guidedTours = useGuidedTours();

  return (
    <Container>
      <div className='flex flex-col gap-8'>
        <div className='border-y border-y-white border-solid flex flex-col gap-4 p-8 h-50-screen sm:h-30-screen'>
          <p className='font-bebas text-3xl sm:text-4xl'>Visitas</p>
          <p className='text-md sm:text-lg'>
            Su presencia nos conforta, siempre hay una buena razon para visitar nuestro museo y recorrer la historia con las grandes obras con las que contamos aparte de pasar un buen dia en familia y ampliar sus conocimientos de arte.<br></br>Haz un recorrido por el museo NAPOLEON y descubre todo lo que tenemos para ti
          </p>
          <div></div>
        </div>
      </div>
      <div className='flex flex-col gap-8 mt-8'>
        {guidedTours &&
          guidedTours.map((item) => (
            <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }} key={item.id_guided_tours} className='relative border-y border-y-white border-solid sm:h-40-screen h-50-screen flex flex-col justify-between items-start'>
              <Image className='object-cover w-full -z-10' src={'/img/El_estanque.jpg'} alt={item.name_guided_tours} layout='fill' />
              <div className='flex flex-col justify-between items-start h-full w-full p-8 bg-black bg-opacity-40 text-white'>
                <div className='flex flex-col justify-start items-start gap-4 z-20'>
                  <p className='font-bebas text-3xl sm:text-4xl'>{item.name_guided_tours}</p>
                  <p className='text-md sm:text-lg'>{item.description}</p>
                  <p className='text-md sm:text-lg'>{item.day}</p>
                  <p className='text-md sm:text-lg'>
                    {item.hour_start} - {item.hour_end}
                  </p>
                </div>
                <button className='z-20 flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={() => router.push('/guided_tours/' + item.id_guided_tours)}>
                  <p>Ver visita</p>
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </Container>
  );
};

export default GuidesTours;
