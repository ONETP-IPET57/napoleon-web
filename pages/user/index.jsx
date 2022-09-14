import React from 'react';
import Container from '../../layouts/Container';
import Image from 'next/image';
import useUser from '../../hooks/useUser';
import Router from 'next/router';
import AdminDashboard from '../../components/AdminDashboard';

const Index = () => {
  const user = useUser({ redirectTo: '/user/login', redirectIfFound: false });

  console.log(user);

  return (
    <Container>
      {user && (
        <div className='relative [height:60vh] w-screen overflow-hidden flex justify-center items-center'>
          <Image className='object-cover sm:aspect-cine w-full [height:80vh] sm:h-auto' src={'/img/cyberpunkcity-01.jpg'} alt='cyberpunk city art' layout='fill' />
          <div className='absolute inset-0 flex flex-col justify-start items-start bg-opacity-40 bg-black p-8 gap-8'>
            <p className='text-4xl uppercase font-bebas'>{user.username}</p>
            <p className='text-xl capitalize'>{user.role}</p>
            <button
              className='flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black'
              onClick={() => {
                Router.push('/user/logout');
              }}>
              <p>LogOut</p>
            </button>
          </div>
        </div>
      )}
      {user && user.role === 'administrator' && <AdminDashboard />}
      <div className='p-8 flex flex-col'></div>
    </Container>
  );
};

export default Index;
