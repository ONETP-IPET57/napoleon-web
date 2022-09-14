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

const Login = () => {
  const router = useRouter();
  useUser({ redirectTo: '/user', redirectIfFound: true });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(null);

  const usernameValid = useValidation(username, /^[a-zA-Z0-9\_\-]{4,16}$/);
  const passwordValid = useValidation(password, /^.{4,12}$/);

  const handlerSubmit = useCallback(() => {
    if (!usernameValid && !passwordValid) return;

    fetch('/api/login', {
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
        router.push('/user');
      })
      .catch((err) => {
        setWarning(
          <div className='flex justify-center items-center border border-red-500 border-solid rounded-lg p-2 bg-red-700'>
            <p>El usuario no existe</p>
          </div>
        );
      });
  }, [usernameValid, passwordValid, username, password, router]);

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

  return (
    <Container>
      <div className='mx-8 sm:mx-auto p-8 sm:w-2/6 flex flex-col gap-6 bg-black text-white rounded-3xl border border-white border-solid'>
        <p className='text-xl'>Login</p>
        <div className='flex flex-col gap-2'>
          <label id='label-username' htmlFor='username'>
            Username
          </label>
          <input className='rounded-lg p-2 border border-black border-solid' type='text' id='username' name='username' onChange={handlerChangeUsername} />
        </div>
        <div className='flex flex-col gap-2'>
          <label id='label-password' htmlFor='password'>
            Password
          </label>
          <input className='rounded-lg p-2 border border-black border-solid' type='password' id='password' name='password' onChange={handlerChangePassword} />
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
          <p>Ingresar</p>
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

export default Login;
