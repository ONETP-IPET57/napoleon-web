import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import useExhibition from '../../../hooks/useExhibition';
import useSpeak from '../../../hooks/useSpeak';
import useValidation from '../../../hooks/useValidation';
import Container from '../../../layouts/Container';

const Id = () => {
  const router = useRouter();
  const { action, id } = router.query;
  const exhibition = useExhibition(id);
  const { t } = useTranslation('exhibitions');
  const createAttr = useSpeak();

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [information, setInformation] = useState('');
  const [createdAt, setCreatedAt] = useState(0);
  const [beepcon, setBeepcon] = useState(0);

  const nameValid = useValidation(name, /^.{4,255}$/, true);
  const authorValid = useValidation(author, /^.{4,255}$/, true);
  const informationValid = useValidation(information, /^.{4,255}$/, true);

  useEffect(() => {
    if (exhibition) {
      setName(exhibition.name_exhibition);
      setAuthor(exhibition.author);
      setInformation(exhibition.information);
      setCreatedAt(exhibition.created_at);
      setBeepcon(exhibition.beepcons);
    }
  }, [exhibition]);

  useEffect(() => {
    if (action === 'delete') {
      fetch('/api/exhibition/' + id, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          router.push('/user');
        });
    }
  }, [action, id, router]);

  const handlerSubmit = useCallback(() => {
    if (!nameValid && !authorValid && !informationValid) return;

    fetch('/api/exhibition/' + id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name_exhibition': name || exhibition.name_exhibition,
        'author': author || exhibition.author,
        'information': information || exhibition.information,
        'created_at': createdAt || exhibition.created_at,
        'image': exhibition.image,
        'beepcons': beepcon || exhibition.beepcons,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push('/user');
      });
  }, [author, authorValid, exhibition, id, information, informationValid, name, nameValid, router, createdAt, beepcon]);

  const handlerChangeName = (e) => setName(e.target.value);
  const handlerChangeAuthor = (e) => setAuthor(e.target.value);
  const handlerChangeInformation = (e) => setInformation(e.target.value);
  const handlerChangeCreatedAt = (e) => {
    setCreatedAt(e.target.value);
  };
  const handlerChangeBeepcon = (e) => {
    setBeepcon(e.target.value);
  };

  return (
    <Container>
      {exhibition && (
        <div className='mx-8 p-8 flex flex-col gap-6 rounded-3xl border border-white border-solid'>
          <p className='text-xl'>{t('post.edit')}</p>
          <div className='flex flex-col gap-2' {...createAttr(t('post.name'))}>
            <label id='label-name_exhibition' htmlFor='name_exhibition'>
              {t('post.name')}
            </label>
            <input className='rounded-lg p-2 border border-white border-solid' type='text' id='name_exhibition' name='name_exhibition' defaultValue={exhibition.name_exhibition} placeholder={exhibition.name_exhibition} onChange={handlerChangeName} />
          </div>
          <div className='flex flex-col gap-2' {...createAttr(t('post.author'))}>
            <label id='label-author' htmlFor='author'>
              {t('post.author')}
            </label>
            <input className='rounded-lg p-2 border border-white border-solid' type='text' id='author' name='author' defaultValue={exhibition.author} placeholder={exhibition.author} onChange={handlerChangeAuthor} />
          </div>
          <div className='flex flex-col gap-2' {...createAttr(t('post.information'))}>
            <label id='label-information' htmlFor='information'>
              {t('post.information')}
            </label>
            <textarea className='rounded-lg p-2 border border-white border-solid' id='information' name='information' defaultValue={exhibition.information} placeholder={exhibition.information} onChange={handlerChangeInformation} />
          </div>
          <div className='flex flex-col gap-2' {...createAttr(t('post.created_at'))}>
            <label id='label-created_at' htmlFor='created_at'>
              {t('post.created_at')}
            </label>
            <input className='rounded-lg p-2 border border-black border-solid' type='number' id='created_at' name='created_at' defaultValue={exhibition.created_at} onChange={handlerChangeCreatedAt} />
          </div>
          <div className='flex flex-col gap-2' {...createAttr(t('post.beepcon_location'))}>
            <label id='label-beepcon-location' htmlFor='beepcon-location'>
              {t('post.beepcon_location')}
            </label>
            <input className='rounded-lg p-2 border border-black border-solid' type='number' id='beepcon-location' name='beepcon-location' defaultValue={exhibition.beepcons} onChange={handlerChangeBeepcon} />
          </div>
          <button className='flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerSubmit} {...createAttr(t('post.send'))}>
            <p>{t('post.send')}</p>
          </button>
        </div>
      )}
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  const { locale, defaultLocale } = context;
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale || defaultLocale, ['exhibitions', 'container'])),
    },
  };
};

export default Id;
