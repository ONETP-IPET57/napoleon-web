import React from 'react';
import Image from 'next/image';
import Container from '../../layouts/Container';
import { useRouter } from 'next/router';
import useGuidedTour from '../../hooks/useGuidedTour';
import useUser from '../../hooks/useUser';
import useSpeak from '../../hooks/useSpeak';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Id = () => {
  const router = useRouter();
  const { id } = router.query;
  const guidedTour = useGuidedTour(id);
  const user = useUser();
  const createAttr = useSpeak();

  const { t } = useTranslation('guided_tours');

  const handlerReservacion = () => {
    if (user && user.username) {
      fetch('/api/visit/0', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id_guided_tours': id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          router.push('/user');
        });
    } else {
      router.push('/user');
    }
  };

  return (
    <Container>
      <div>
        {guidedTour && (
          <div key={guidedTour.id_guided_tours} className='relative border-y border-y-white border-solid h-auto flex flex-col justify-between items-start' {...createAttr(t('item', { name: guidedTour.name_guided_tours, description: guidedTour.description, day: guidedTour.day, hour_start: guidedTour.hour_start, hour_end: guidedTour.hour_end }))}>
            <Image className='object-cover w-full -z-10' src={'/img/El_estanque.jpg'} alt='tour' layout='fill' />
            <div className='flex flex-col justify-between items-start h-full w-full p-8 gap-4 bg-black bg-opacity-40 text-white'>
              <div className='flex flex-col justify-start items-start gap-4 z-20'>
                <p className='font-bebas text-3xl sm:text-4xl'>{guidedTour.name_guided_tours}</p>
                <p className='text-md sm:text-lg'>{guidedTour.description}</p>
                <p className='text-md sm:text-lg'>{guidedTour.day}</p>
                <p className='text-md sm:text-lg'>
                  {guidedTour.hour_start} - {guidedTour.hour_end}
                </p>
              </div>
              <button className='z-20 flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerReservacion} {...createAttr(user && user.username ? t('reserve') : t('login_reserve'))}>
                <p>{user && user.username ? t('reserve') : t('login_reserve')}</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  const { locale, defaultLocale } = context;
  console.log(context, locale, defaultLocale);
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale || defaultLocale, ['guided_tours', 'container'])),
    },
  };
};

export default Id;
