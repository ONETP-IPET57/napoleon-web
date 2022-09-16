import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import useExhibition from '../../../hooks/useExhibition';
import useValidation from '../../../hooks/useValidation';
import Container from '../../../layouts/Container';

const Id = () => {
  const router = useRouter();
  const { action, id } = router.query;
  const exhibition = useExhibition(id);

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [information, setInformation] = useState('');
  const [createdAt, setCreatedAt] = useState(0);

  const nameValid = useValidation(name, /^.{4,255}$/, true);
  const authorValid = useValidation(author, /^.{4,255}$/, true);
  const informationValid = useValidation(information, /^.{4,255}$/, true);

  useEffect(() => {
    if (exhibition) {
      setName(exhibition.name_exhibition);
      setAuthor(exhibition.author);
      setInformation(exhibition.information);
      setCreatedAt(exhibition.created_at);
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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push('/user');
      });
  }, [author, authorValid, exhibition, id, information, informationValid, name, nameValid, router, createdAt]);

  const handlerChangeName = (e) => setName(e.target.value);
  const handlerChangeAuthor = (e) => setAuthor(e.target.value);
  const handlerChangeInformation = (e) => setInformation(e.target.value);
  const handlerChangeCreatedAt = (e) => {
    setCreatedAt(e.target.value);
  };

  return (
    <Container>
      {exhibition && (
        <div className='mx-8 p-8 flex flex-col gap-6 rounded-3xl border border-white border-solid'>
          <p className='text-xl'>Editar</p>
          <div className='flex flex-col gap-2'>
            <label id='label-name_exhibition' htmlFor='name_exhibition'>
              Name
            </label>
            <input className='rounded-lg p-2 border border-white border-solid' type='text' id='name_exhibition' name='name_exhibition' defaultValue={exhibition.name_exhibition} placeholder={exhibition.name_exhibition} onChange={handlerChangeName} />
          </div>
          <div className='flex flex-col gap-2'>
            <label id='label-author' htmlFor='author'>
              Author
            </label>
            <input className='rounded-lg p-2 border border-white border-solid' type='text' id='author' name='author' defaultValue={exhibition.author} placeholder={exhibition.author} onChange={handlerChangeAuthor} />
          </div>
          <div className='flex flex-col gap-2'>
            <label id='label-information' htmlFor='information'>
              Information
            </label>
            <textarea className='rounded-lg p-2 border border-white border-solid' id='information' name='information' defaultValue={exhibition.information} placeholder={exhibition.information} onChange={handlerChangeInformation} />
          </div>
          <div className='flex flex-col gap-2'>
            <label id='label-created_at' htmlFor='created_at'>
              Created At
            </label>
            <input className='rounded-lg p-2 border border-black border-solid' type='number' id='created_at' name='created_at' defaultValue={exhibition.created_at} onChange={handlerChangeCreatedAt} />
          </div>
          <button className='flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerSubmit}>
            <p>Enviar</p>
          </button>
        </div>
      )}
    </Container>
  );
};

export default Id;
