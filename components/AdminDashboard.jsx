import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useExhibitions from '../hooks/useExhibitions';
import io from 'socket.io-client';
import { useTranslation } from 'next-i18next';
import useSpeak from '../hooks/useSpeak';

let socket;

const AdminDashboard = () => {
  const router = useRouter();
  const exhibitions = useExhibitions();
  const [exhibitionSelected, setExhibitionSelected] = useState('1');
  const [beepconLocation, setBeepconLocation] = useState('');
  const createAttr = useSpeak();

  const { t } = useTranslation('user');

  const { t: tExhibition } = useTranslation('exhibitions');

  useEffect(() => {
    socket = io('https://socket.napoleon.tikkix2.com.ar');
    console.log(socket);

    socket.on('newIncomingAlert', (msg) => {
      console.log(msg);
    });

    socket.on('newIncomingLocation', (msg) => {
      if (msg && msg.beepconLocation) setBeepconLocation(msg.beepconLocation);
      console.log(msg);
    });
  }, []);

  const handlerSendAlert = async () => {
    socket.emit('createdAlert', { author: 'dev', id_exhibition: exhibitionSelected });
  };

  const handlerSelect = (e) => {
    setExhibitionSelected(e.target.value);
  };

  return (
    <div className='flex flex-col gap-8 mt-8'>
      <div className='flex flex-col h-full p-8 gap-8 border-y border-y-white border-solid'>
        <p className='w-full text-md sm:text-lg' {...createAttr(t('beepcons_simulation.title'))}>
          {t('beepcons_simulation.title')}
        </p>
        <select className='z-20 text-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' name='exhibition_select' id='exhibition_select' onChange={handlerSelect} {...createAttr(t('beepcons_simulation.select'))}>
          {exhibitions &&
            exhibitions.map((item) => {
              return (
                <option key={item.id_exhibition} value={item.id_exhibition}>
                  <p>{item.name_exhibition}</p>
                </option>
              );
            })}
        </select>
        <button className='z-20 flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerSendAlert} {...createAttr(t('beepcons_simulation.button'))}>
          {t('beepcons_simulation.button')}
        </button>
        <p className='w-full text-md sm:text-lg' {...createAttr(t('beepcons_simulation.current_location', { beepcon: beepconLocation || 0 }))}>
          {t('beepcons_simulation.current_location', { beepcon: beepconLocation || 0 })}
        </p>
      </div>
      <div className='flex flex-col h-full p-8 gap-8'>
        {exhibitions &&
          exhibitions.map((item) => {
            return (
              <div id={`exhibition-${item.id_exhibition}`} key={item.id} className='relative rounded-lg overflow-hidden h-80-screen sm:h-auto border border-solid border-white' {...createAttr(tExhibition('item', { name_exhibition: item.name_exhibition, author: item.author, information: item.information }))}>
                {item.image && (item.image.includes('.jpg') || item.image.includes('base64')) && <Image className='object-cover -z-10' src={item.image} alt={`exhibition-image-${item.id_exhibition}`} layout='fill' />}
                <div className='flex flex-col justify-between items-start gap-4 p-4 bg-black bg-opacity-30'>
                  <p className='font-bebas text-3xl'>{item.name_exhibition}</p>
                  <p>{item.author}</p>
                  <p>{item.created_at}</p>
                  <div className='flex flex-col justify-start items-start gap-2 flex-wrap h-auto w-full'>
                    {item.information.split('\n').map((text, index) => {
                      return (
                        <p className='text-md sm:text-md mr-8 w-full [maxWidth:40%] sm:[maxWidth:40%] break-normal' key={index}>
                          {text.replace('\n', '.')}
                        </p>
                      );
                    })}
                  </div>
                  <div className='flex justify-start items-start gap-4 z-20'>
                    <button className='rounded-md border border-solid border-white py-2 px-4' onClick={() => router.push(`/exhibition/edit/${item.id_exhibition}`)} {...createAttr(t('controls.edit'))}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className='rounded-md border border-solid border-white py-2 px-4' onClick={() => router.push(`/exhibition/delete/${item.id_exhibition}`)} {...createAttr(t('controls.delete'))}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        <button className='relative rounded-lg overflow-hidden h-10-screen p-4 gap-4 flex justify-start items-center border border-solid border-white' onClick={() => router.push(`/exhibition/add`)} {...createAttr(t('controls.add'))}>
          <div className='rounded-md border border-solid border-white py-2 px-4'>
            <FontAwesomeIcon icon={faAdd} />
          </div>
          <p>{t('controls.add')}</p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
