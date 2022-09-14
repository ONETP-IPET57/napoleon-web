import React from 'react';
import Image from 'next/image';
import Container from '../../layouts/Container';
import useGuidedTours from '../../hooks/useGuidedTours';
import { useRouter } from 'next/router';

const GuidesTours = () => {
  const router = useRouter();
  const guidedTours = useGuidedTours();

  return (
    <Container>
      <div className='flex flex-col gap-8'>
        <div className='border-y border-y-white border-solid flex flex-col gap-4 py-8 px-16 h-50-screen sm:h-30-screen'>
          <p className='font-bebas text-3xl sm:text-4xl'>Lorem ipsum dolor sit amet.</p>
          <p className='text-md sm:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dicta ab voluptatum velit, quod laborum corrupti iusto. Distinctio dolores eligendi magnam iste facere quisquam, esse saepe sunt maxime.</p>
          <div></div>
        </div>
      </div>
      <div className='flex flex-col gap-8 mt-8'>
        {guidedTours &&
          guidedTours.map((item) => (
            <div key={item.id_guided_tours} className='relative mx-8 border-y border-y-white border-solid p-8 sm:h-40-screen h-50-screen flex flex-col justify-between items-start'>
              <Image className='object-cover w-full -z-10' src={'/img/cyberpunkcity-01.jpg'} alt='cyberpunk city art' layout='fill' />
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
          ))}
      </div>
    </Container>
  );
};

export default GuidesTours;
