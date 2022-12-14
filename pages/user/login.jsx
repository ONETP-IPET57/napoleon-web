import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Container from '../../layouts/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUser from '../../hooks/useUser';
import useValidation from '../../hooks/useValidation';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSpeak from '../../hooks/useSpeak';

const Login = () => {
  const router = useRouter();
  useUser({ redirectTo: '/user', redirectIfFound: true });
  const { t } = useTranslation('user');
  const createAttr = useSpeak();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(null);

  const usernameValid = useValidation(username, /^[a-zA-Z0-9\_\-]{4,16}$/);
  const passwordValid = useValidation(password, /^.{4,12}$/);

  const handlerSubmit = useCallback(() => {
    if (!usernameValid || !passwordValid) return;

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
      .then((res) => {
        if (res.status === 500) {
          setWarning(
            <div className='flex justify-center items-center border border-red-500 border-solid rounded-lg p-2 bg-red-700' {...createAttr(t('error') + res.status)}>
              <p>
                {t('error')} {res.status}
              </p>
            </div>
          );
        } else {
          res.json().then((data) => {
            if (data && data.message) {
              setWarning(
                <div className='flex justify-center items-center border border-red-500 border-solid rounded-lg p-2 bg-red-700' onMouseEnter={() => speak(data.message)} onMouseLeave={cancel}>
                  <p>{data.message}</p>
                </div>
              );
            } else if (data && data.msg) {
              setWarning(
                <div className='flex justify-center items-center border border-red-500 border-solid rounded-lg p-2 bg-red-700' {...createAttr(data.msg)}>
                  <p>{data.msg}</p>
                </div>
              );
            } else {
              router.push('/user');
            }
          });
        }
      })
      .catch((err) => {
        setWarning(
          <div className='flex justify-center items-center border border-red-500 border-solid rounded-lg p-2 bg-red-700' {...createAttr(t('error'))}>
            <p>{t('error')}</p>
          </div>
        );
      });
  }, [usernameValid, passwordValid, username, password, router, createAttr, t]);

  const handlerChangeUsername = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );

  const handlerChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <Container>
      <div className='border-y border-y-white border-solid'>
        <div className='mx-8 sm:mx-auto p-8 sm:w-3/6 lg:w-2/6 flex flex-col gap-6'>
          <p className='text-xl' {...createAttr(t('login'))}>
            {t('login')}
          </p>
          <div className='flex flex-col gap-2' {...createAttr(t('username'))}>
            <label id='label-username' htmlFor='username'>
              {t('username')}
            </label>
            <div className='flex gap-4 pr-4 items-center'>
              <input className={'rounded-lg p-2 border border-white border-solid flex-1'} style={{ outline: usernameValid ? '#22c55e solid 2px' : 'rgb(239 68 68) solid 2px' }} type='text' id='username' name='username' onChange={handlerChangeUsername} />
              <FontAwesomeIcon style={{ color: usernameValid ? '#22c55e' : 'rgb(239 68 68)' }} icon={usernameValid ? faCheckCircle : faXmarkCircle} />
            </div>
          </div>
          <div className='flex flex-col gap-2' {...createAttr(t('password'))}>
            <label id='label-password' htmlFor='password'>
              {t('password')}
            </label>
            <div className='flex gap-4 pr-4 items-center'>
              <input className='rounded-lg p-2 border border-white border-solid flex-1' style={{ outline: passwordValid ? '#22c55e solid 2px' : 'rgb(239 68 68) solid 2px' }} type='password' id='password' name='password' onChange={handlerChangePassword} />
              <FontAwesomeIcon style={{ color: passwordValid ? '#22c55e' : 'rgb(239 68 68)' }} icon={passwordValid ? faCheckCircle : faXmarkCircle} />
            </div>
          </div>
          {warning}
          <button className='flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black ' onClick={handlerSubmit} {...createAttr(t('login_button'))}>
            <p>{t('login_button')}</p>
          </button>
          {/*

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

        */}
          <div className='flex justify-center items-center gap-4' {...createAttr(t('dont_account'))}>
            <div className='border border-white border-solid flex-1 h-0' />
            <p className=''>{t('dont_account')}</p>
            <div className='border border-white border-solid flex-1 h-0' />
          </div>
          <div className='flex justify-center items-center gap-4' {...createAttr(t('signup_button'))}>
            <button className='flex flex-1 items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={() => router.push('/user/signup')}>
              <p>{t('signup_button')}</p>
            </button>
          </div>
        </div>
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
      ...(await serverSideTranslations(locale || defaultLocale, ['user', 'container'])),
    },
  };
};

export default Login;
