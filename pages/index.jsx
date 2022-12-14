import React, { useCallback, useState, useEffect } from 'react';
import Container from '../layouts/Container';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowLeftLong, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useExhibitions from '../hooks/useExhibitions';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSpeak from '../hooks/useSpeak';

const Index = ({ locale }) => {
  const [carrouselCounter, setCarrouselCounter] = useState(0);
  const exhibitions = useExhibitions();
  const [fixedExhibitions, setFixedExhibitions] = useState([]);
  const createAttr = useSpeak();

  const { t } = useTranslation('home');

  const handlerLeftCarrousel = useCallback(() => {
    if (carrouselCounter != 0) {
      setCarrouselCounter(carrouselCounter - 1);
    } else {
      setCarrouselCounter(2);
    }
  }, [carrouselCounter]);

  const handlerRightCarrousel = useCallback(() => {
    if (carrouselCounter != 2) {
      setCarrouselCounter(carrouselCounter + 1);
    } else {
      setCarrouselCounter(0);
    }
  }, [carrouselCounter]);

  useEffect(() => {
    if (exhibitions && exhibitions.length !== 0) {
      let fix = [];
      for (let i = 0; i < 3; i++) {
        const item = exhibitions[i];
        fix.push(item);
      }
      setFixedExhibitions(fix);
    }
  }, [exhibitions]);

  return (
    <Container>
      <div className='flex flex-col gap-8'>
        <div className='border-y border-y-white border-solid h-30-screen flex flex-col justify-center items-start p-8 font-bebas text-xl sm:text-4xl' {...createAttr(t('home-text'))}>
          {t('home-text')
            .split('.')
            .map((item, index) => {
              return item !== '' ? <p key={index}>{item}</p> : null;
            })}
        </div>
        <div className='relative overflow-hidden flex flex-col gap-8 py-8 border-y border-y-white border-solid'>
          <p className='w-full px-8 text-md sm:text-lg' {...createAttr(t('featured-exhibitions'))}>
            {t('featured-exhibitions')}
          </p>
          <motion.div className={`flex flex-row flex-wrap relative overflow-hidden border-y border-y-white border-solid`} style={{ width: 100 * fixedExhibitions.length + 'vw' }} initial={{ x: 0 }} animate={{ x: -100 * carrouselCounter + 'vw' }} transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
            {fixedExhibitions &&
              fixedExhibitions.length !== 0 &&
              fixedExhibitions.map((item) => {
                return (
                  <div className='relative h-60-screen w-screen overflow-hidden flex-1 flex justify-center items-center' key={item.id_exhibition} {...createAttr(item.name_exhibition)}>
                    <Image className='object-cover sm:aspect-cine w-full h-80-screen sm:h-auto' src={item.image} alt={item.name_exhibition} layout='fill' />
                    <div className='w-full h-full flex justify-start items-end bg-opacity-40 bg-black z-20'>
                      <p className='m-8 text-lg uppercase'>{item.name_exhibition}</p>
                    </div>
                  </div>
                );
              })}
          </motion.div>
          <div className='flex flex-row justify-between items-center z-10 px-8'>
            <button onClick={handlerLeftCarrousel}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={handlerRightCarrousel}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className='border-y border-y-white border-solid flex flex-col gap-8 py-8'>
          <p className='w-full px-8 text-md sm:text-lg' {...createAttr(t('facilities'))}>
            {t('facilities')}
          </p>
          <div className='relative h-50-screen border-y border-y-white border-solid'>
            <Image className='invert object-contain lg:object-cover ' src={'/img/napoleon-plano.jpeg'} alt='plano' layout='fill' />
          </div>
        </div>
      </div>
    </Container>
  );
};

// export const getServerSideProps = async ({ locale }) => ({
export const getStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  console.log(context, locale, defaultLocale);
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale || defaultLocale, ['home', 'container'])),
    },
  };
};

export default Index;
