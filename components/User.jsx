import Link from 'next/link';
import React from 'react';
import useUser from '../hooks/useUser';

const User = ({ login }) => {
  const user = useUser();

  return (
    <Link href={'/user'}>
      <div className='rounded-3xl bg-green-200 flex flex-row justify-center items-center gap-4 p-4 relative'>
        <p className='text-black'>{user && user.username ? user.username : login}</p>
      </div>
    </Link>
  );
};

export default User;
