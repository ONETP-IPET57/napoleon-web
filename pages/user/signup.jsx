import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Container from '../../layouts/Container';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useRecoilState } from 'recoil';
import { accessTokenState, userState } from '../../atoms/userAtoms';
import useUser from '../../hooks/useUser';
import useValidation from '../../hooks/useValidation';

const Signup = () => {
  const router = useRouter();
  useUser({ redirectTo: '/user', redirectIfFound: true });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(null);

  const usernameValid = useValidation(username, /^[a-zA-Z0-9\_\-]{4,16}$/);
  const passwordValid = useValidation(password, /^.{4,12}$/);
  const emailValid = useValidation(email, /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

  const handlerSubmit = useCallback(() => {
    if (!usernameValid && !passwordValid && !emailValid) return;

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password,
        'email': email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push('/user');
      })
      .catch((err) => {
        setWarning(
          <div className='flex justify-center items-center border border-red-500 border-solid rounded-lg p-2 bg-red-700'>
            <p>El usuario ya existe</p>
          </div>
        );
      });
  }, [usernameValid, passwordValid, emailValid, username, password, email, router]);

  const handlerChangeUsername = useCallback(
    (e) => {
      setUsername(e.target.value);
      console.log(usernameValid);
    },
    [usernameValid, setUsername]
  );

  const handlerChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      console.log(passwordValid);
    },
    [passwordValid, setPassword]
  );

  const handlerChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
      console.log(emailValid);
    },
    [emailValid, setEmail]
  );

  return (
    <Container>
      <div className='mx-8 sm:mx-auto p-8 sm:w-2/6 flex flex-col gap-4 rounded-3xl border border-black dark:border-white border-solid'>
        <p className='text-xl'>Sign Up</p>
        <div className='flex flex-col gap-2'>
          <label>Email</label>
          <input className='rounded-lg p-2 border border-black dark:border-white border-solid' type='email' onChange={handlerChangeEmail} />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Username</label>
          <input className='rounded-lg p-2 border border-black dark:border-white border-solid' type='text' onChange={handlerChangeUsername} />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Password</label>
          <input className='rounded-lg p-2 border border-black dark:border-white border-solid' type='password' onChange={handlerChangePassword} />
        </div>
        {warning}
        <button className='flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerSubmit}>
          <p>Registrarse</p>
        </button>
        <div className='flex justify-center items-center gap-4'>
          <div className='border border-black dark:border-white border-solid flex-1 h-0' />
          <p className=''>O continua con:</p>
          <div className='border border-black dark:border-white border-solid flex-1 h-0' />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <button className='flex-1 border border-black dark:border-white border-solid p-2 rounded-lg'>
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button className='flex-1 border border-black dark:border-white border-solid p-2 rounded-lg'>
            <FontAwesomeIcon icon={faFacebook} />
          </button>
        </div>
        <div className='flex justify-center items-center gap-4'>
          <div className='border border-black dark:border-white border-solid flex-1 h-0' />
          <p className=''>Ya tienes cuenta?</p>
          <div className='border border-black dark:border-white border-solid flex-1 h-0' />
        </div>
        <div className='flex justify-center items-center gap-4'>
          <button className='flex flex-1 items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={() => router.push('/user/login')}>
            <p>Logearse</p>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
