import Link from 'next/link';
import React from 'react';
import useSpeak from '../hooks/useSpeak';
import useUser from '../hooks/useUser';

const User = ({ login }) => {
  const user = useUser();
  const createAttr = useSpeak();

  return (
    <Link href={'/user'}>
      <div className='rounded-3xl bg-green-200 flex flex-row justify-center items-center gap-4 p-4 relative' {...createAttr(user && user.username ? user.username : login)}>
        <p className='text-black'>{user && user.username ? user.username : login}</p>
      </div>
    </Link>
  );
};

export default User;
