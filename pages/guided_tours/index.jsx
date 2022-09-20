import React from 'react';
import Image from 'next/image';
import Container from '../../layouts/Container';
import useGuidedTours from '../../hooks/useGuidedTours';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSpeak from '../../hooks/useSpeak';

const GuidesTours = () => {
  const router = useRouter();
  const guidedTours = useGuidedTours();
  const createAttr = useSpeak();

  const { t } = useTranslation('guided_tours');

  return (
    <Container>
      <div className='flex flex-col gap-8'>
        <div className='border-y border-y-white border-solid flex flex-col gap-4 p-8 h-auto'>
          <p className='font-bebas text-3xl sm:text-4xl' {...createAttr(t('guided_tours_title'))}>
            {t('guided_tours_title')}
          </p>
          <div className='flex flex-col' {...createAttr(t('guided_tours_text'))}>
            {t('guided_tours_text')
              .split('.')
              .map((item, index) => {
                return item !== '' ? (
                  <p className='text-md sm:text-lg' key={index}>
                    {item}
                  </p>
                ) : null;
              })}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-8 mt-8'>
        {guidedTours &&
          guidedTours.map((item) => (
            <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.01 }} key={item.id_guided_tours} className='relative border-y border-y-white border-solid sm:h-auto h-50-screen flex flex-col justify-between items-start' {...createAttr(t('item', { name: item.name_guided_tours, description: item.description, day: item.day, hour_start: item.hour_start, hour_end: item.hour_end }))}>
              <Image className='object-cover w-full -z-10' src={'/img/El_estanque.jpg'} alt={item.name_guided_tours} layout='fill' />
              <div className='flex flex-col justify-between items-start h-full w-full p-8 gap-4 bg-black bg-opacity-40 text-white'>
                <div className='flex flex-col justify-start items-start gap-4 z-20'>
                  <p className='font-bebas text-3xl sm:text-4xl'>{item.name_guided_tours}</p>
                  <p className='text-md sm:text-lg'>{item.description}</p>
                  <p className='text-md sm:text-lg'>{item.day}</p>
                  <p className='text-md sm:text-lg'>
                    {item.hour_start} - {item.hour_end}
                  </p>
                </div>
                <button className='z-20 flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' {...createAttr(t('guided_tours_to'))} onClick={() => router.push('/guided_tours/' + item.id_guided_tours)}>
                  <p>{t('guided_tours_to')}</p>
                </button>
              </div>
            </motion.div>
          ))}
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
      ...(await serverSideTranslations(locale || defaultLocale, ['guided_tours', 'container'])),
    },
  };
};

export default GuidesTours;
