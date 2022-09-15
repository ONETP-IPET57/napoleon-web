import React, { useCallback, useState, useEffect } from 'react';
import Container from '../layouts/Container';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowLeftLong, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useExhibitions from '../hooks/useExhibitions';

const Index = () => {
  const [carrouselCounter, setCarrouselCounter] = useState(0);
  const exhibitions = useExhibitions();
  const [fixedExhibitions, setFixedExhibitions] = useState([]);

  const handlerLeftCarrousel = useCallback(() => {
    if (carrouselCounter != 0) setCarrouselCounter(carrouselCounter - 1);
  }, [carrouselCounter]);

  const handlerRightCarrousel = useCallback(() => {
    if (carrouselCounter != 2) setCarrouselCounter(carrouselCounter + 1);
  }, [carrouselCounter]);

  useEffect(() => {
    if (!exhibitions && exhibitions.length === 0) return;
    let fix = [];
    for (let i = 0; i < 3; i++) {
      const item = exhibitions[i];
      fix.push(item);
    }
    setFixedExhibitions(fix);
  }, [exhibitions]);

  return (
    <Container>
      <div className='relative w-screen overflow-hidden flex'>
        <motion.div className='flex flex-row' initial={{ x: 0 }} animate={{ x: -100 * carrouselCounter + 'vw' }} transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}>
          {fixedExhibitions &&
            fixedExhibitions.map((item) => {
              return (
                <div className='relative [height:60vh] w-screen overflow-hidden flex justify-center items-center' key={item.id_exhibition}>
                  <Image className='object-cover sm:aspect-cine w-full [height:80vh] sm:h-auto' src={item.image} alt='cyberpunk city art' layout='fill' />
                  <div className='absolute inset-0 flex justify-center items-center bg-opacity-40 bg-black'>
                    <p className='text-lg uppercase'>{item.name_exhibition}</p>
                  </div>
                </div>
              );
            })}
        </motion.div>
        <div className='absolute inset-0 flex flex-row justify-between items-center z-10 p-8'>
          <button onClick={handlerLeftCarrousel}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={handlerRightCarrousel}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Index;
