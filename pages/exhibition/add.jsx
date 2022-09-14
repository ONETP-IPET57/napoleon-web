import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import useExhibition from '../../hooks/useExhibition';
import useValidation from '../../hooks/useValidation';
import Container from '../../layouts/Container';

const Id = () => {
  const router = useRouter();

  const [name, setName] = useState(null);
  const [author, setAuthor] = useState(null);
  const [information, setInformation] = useState(null);
  const [image, setImage] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  const nameValid = useValidation(name, /^.{4,255}$/);
  const authorValid = useValidation(author, /^.{4,255}$/);
  const informationValid = useValidation(information, /^.{4,255}$/);

  const handlerSubmit = useCallback(() => {
    if (!nameValid && !authorValid && !informationValid) return;

    fetch('/api/exhibition/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name_exhibition': name,
        'author': author,
        'information': information,
        'created_at': createdAt,
        'image': image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push('/user');
      });
  }, [author, authorValid, createdAt, image, information, informationValid, name, nameValid, router]);

  const handlerChangeName = (e) => setName(e.target.value);
  const handlerChangeAuthor = (e) => setAuthor(e.target.value);
  const handlerChangeInformation = (e) => setInformation(e.target.value);
  const handlerChangeImage = async (e) => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    toBase64(e.target.files[0]).then((item) => {
      setImage(item);
    });
  };
  const handlerChangeCreatedAt = (e) => {
    setCreatedAt(e.target.value);
  };

  return (
    <Container>
      <div className='mx-8 p-8 flex flex-col gap-6 bg-black text-white rounded-3xl border border-white border-solid'>
        <p className='text-xl'>Añadir</p>
        <div className='flex flex-col gap-2'>
          <label id='label-name_exhibition' htmlFor='name_exhibition'>
            Name
          </label>
          <input className='rounded-lg p-2 border border-black border-solid' type='text' id='name_exhibition' name='name_exhibition' placeholder={'Name exhibition'} onChange={handlerChangeName} />
        </div>
        <div className='flex flex-col gap-2'>
          <label id='label-author' htmlFor='author'>
            Author
          </label>
          <input className='rounded-lg p-2 border border-black border-solid' type='text' id='author' name='author' placeholder={'Author name'} onChange={handlerChangeAuthor} />
        </div>
        <div className='flex flex-col gap-2'>
          <label id='label-information' htmlFor='information'>
            Information
          </label>
          <textarea className='rounded-lg p-2 border border-black border-solid' id='information' name='information' placeholder={'Information'} onChange={handlerChangeInformation} />
        </div>
        <div className='flex flex-col gap-2'>
          <label id='label-created_at' htmlFor='created_at'>
            Created At
          </label>
          <input className='rounded-lg p-2 border border-black border-solid' type='date' id='created_at' name='created_at' defaultValue={new Date(Date.now()).toISOString().split('T')[0]} onChange={handlerChangeCreatedAt} />
        </div>
        <div className='flex flex-col gap-2'>
          <label id='label-image-url' htmlFor='image-url'>
            Image URL
          </label>
          <input className='rounded-lg p-2 border border-black border-solid' type='file' id='image-url' name='image-url' placeholder={'Image URL'} onChange={handlerChangeImage} />
        </div>
        <button className='flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerSubmit}>
          <p>Añadir</p>
        </button>
      </div>
    </Container>
  );
};

export default Id;
