import React from 'react';
import Container from '../../layouts/Container';
import Image from 'next/image';
import useUser from '../../hooks/useUser';
import { useRouter } from 'next/router';
import AdminDashboard from '../../components/AdminDashboard';
import useUserVisits from '../../hooks/useUserVisits';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  const router = useRouter();
  const user = useUser({ redirectTo: '/user/login', redirectIfFound: false });
  const visits = useUserVisits();

  console.log(user);
  console.log(visits);

  return (
    <Container>
      {user && (
        <div className='relative h-30-screen w-screen overflow-hidden flex justify-center items-center border-y border-y-white border-y-solid'>
          <Image className='object-cover sm:aspect-cine w-full sm:h-auto' src={'/img/LA_TARDE.jpg'} alt='User background' layout='fill' />
          <div className='absolute inset-0 flex flex-col justify-start items-start bg-opacity-40 bg-black p-8 gap-8'>
            <p className='text-4xl uppercase font-bebas'>{user.username}</p>
            <p className='text-xl capitalize'>{user.role}</p>
            <button
              className='flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black'
              onClick={() => {
                router.push('/user/logout');
              }}>
              <p>LogOut</p>
            </button>
          </div>
        </div>
      )}
      {user && user.role === 'administrator' && <AdminDashboard />}
      <>
        {visits && visits.length !== 0 && (
          <>
            <div className='p-8 border-y border-y-white border-y-solid'>
              <p className='text-4xl uppercase font-bebas'>Visitas Pendientes:</p>
            </div>
            <div className='p-8 gap-8 flex flex-col'>
              {visits &&
                visits.map((item) => {
                  return (
                    <div key={item.id_visit} className='relative rounded-lg overflow-hidden h-10-screen p-8 gap-4 flex justify-between items-center border border-solid border-white'>
                      <div className='flex gap-4'>
                        <p className='text-2xl uppercase font-bebas'>{item.name_guided_tours}</p>-<p className='text-lg'>Your reference name: {item.reference_name}</p>
                      </div>
                      <button className='rounded-md border border-solid border-white py-2 px-4' onClick={() => router.push(`/visits/delete/${item.id_visit}`)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </>
    </Container>
  );
};

export default Index;
