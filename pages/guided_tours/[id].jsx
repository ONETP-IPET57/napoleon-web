import React from 'react';
import Image from 'next/image';
import Container from '../../layouts/Container';
import { useRouter } from 'next/router';
import useGuidedTour from '../../hooks/useGuidedTour';

const Id = () => {
  const router = useRouter();
  const { id } = router.query;
  const guidedTour = useGuidedTour(id);

  const handlerReservacion = () => {
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
  };

  return (
    <Container>
      <div>
        {guidedTour && (
          <div key={guidedTour.id_guided_tours} className='relative border-y border-y-white border-solid p-8 sm:h-40-screen h-50-screen flex flex-col justify-between items-start'>
            <Image className='object-cover w-full -z-10' src={'/img/cyberpunkcity-01.jpg'} alt='cyberpunk city art' layout='fill' />
            <div className='flex flex-col justify-start items-start gap-4 z-20'>
              <p className='font-bebas text-3xl sm:text-4xl'>{guidedTour.name_guided_tours}</p>
              <p className='text-md sm:text-lg'>{guidedTour.description}</p>
              <p className='text-md sm:text-lg'>{guidedTour.day}</p>
              <p className='text-md sm:text-lg'>
                {guidedTour.hour_start} - {guidedTour.hour_end}
              </p>
            </div>
            <button className='z-20 flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerReservacion}>
              <p>Reservar visita</p>
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Id;