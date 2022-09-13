import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Container from '../../layouts/Container';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms/userAtoms';

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(null);
  const [user, setUser] = useRecoilState(userState);

  const handlerSubmit = useCallback(() => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
        router.push('/user');
      })
      .catch((err) => {
        setWarning(
          <div className='flex justify-center items-center border border-red-500 border-solid rounded-lg p-2 bg-red-700'>
            <p>El usuario ya existe</p>
          </div>
        );
      });
  }, [username, password, router]);

  return (
    <Container>
      <div className='mx-8 sm:mx-auto p-8 sm:w-2/6 flex flex-col gap-4 bg-black text-white rounded-3xl border border-white border-solid'>
        <p className='text-xl'>Sign Up</p>
        <div className='flex flex-col gap-2'>
          <label>Email</label>
          <input className='rounded-lg p-2 border border-black border-solid' type='email' />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Username</label>
          <input className='rounded-lg p-2 border border-black border-solid' type='text' />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Password</label>
          <input className='rounded-lg p-2 border border-black border-solid' type='password' />
        </div>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <div className='flex gap-2'>
            <input type='checkbox' name='remember' id='remember' />
            <label>Recordarme?</label>
          </div>
          <Link className='text-green-200' href={'/'}>
            <p>Olvidaste tu contraseña?</p>
          </Link>
        </div>
        {warning}
        <button className='flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerSubmit}>
          <p>Registrarse</p>
        </button>
        <div className='flex justify-center items-center gap-4'>
          <div className='border border-white border-solid flex-1 h-0' />
          <p className=''>O continua con:</p>
          <div className='border border-white border-solid flex-1 h-0' />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <button className='flex-1 border border-white border-solid p-2 rounded-lg'>
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button className='flex-1 border border-white border-solid p-2 rounded-lg'>
            <FontAwesomeIcon icon={faFacebook} />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
