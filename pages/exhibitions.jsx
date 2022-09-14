import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Container from '../layouts/Container';
import useExhibitions from '../hooks/useExhibitions';
import { motion } from 'framer-motion';

const Exhibitions = () => {
  const router = useRouter();
  const exhibitions = useExhibitions();

  return (
    <Container>
      <div className='flex flex-col gap-8'>
        <div className='border-y border-y-white border-solid flex flex-col gap-4 py-8 px-16 h-50-screen sm:h-30-screen'>
          <p className='font-bebas text-3xl sm:text-4xl'>Exhibiciones</p>
          <p className='text-md sm:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dicta ab voluptatum velit, quod laborum corrupti iusto. Distinctio dolores eligendi magnam iste facere quisquam, esse saepe sunt maxime.</p>
          <div></div>
        </div>
        {exhibitions &&
          exhibitions.map((item) => {
            return (
              <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }} key={item.id_exhibition} className='relative mx-8 border-y border-y-white border-solid p-8 sm:h-40-screen h-50-screen flex flex-col justify-between items-start'>
                <Image className='object-cover w-full -z-10' src={item.image} alt='cyberpunk city art' layout='fill' />
                <div className='flex flex-col justify-start items-start gap-4'>
                  <p className='font-bebas text-3xl sm:text-4xl'>{item.name_exhibition}</p>
                  <p className='text-md sm:text-xl'>{item.author}</p>
                  <p className='text-md sm:text-lg'>{item.information}</p>
                </div>
              </motion.div>
            );
          })}
      </div>
    </Container>
  );
};

export default Exhibitions;
