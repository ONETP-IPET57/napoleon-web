import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useExhibitions from '../hooks/useExhibitions';
import io from 'socket.io-client';

let socket;

const AdminDashboard = () => {
  const router = useRouter();
  const exhibitions = useExhibitions();
  const [exhibitionSelected, setExhibitionSelected] = useState('1');
  const [beepconLocation, setBeepconLocation] = useState('');

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

  const handlerSelect = (e) => setExhibitionSelected(e.target.value);

  return (
    <div className='flex flex-col gap-8 mt-8'>
      <div className='flex flex-col h-full p-8 gap-8 border-y border-y-white border-solid'>
        <p className='w-full text-md sm:text-lg'>Dev &quot; Puntos inteligentes &quot; Simulation</p>
        <select className='z-20 text-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' name='exhibition_select' id='exhibition_select' onChange={handlerSelect}>
          {exhibitions &&
            exhibitions.map((item) => {
              return (
                <option key={item.id_exhibition} value={item.id_exhibition}>
                  {item.name_exhibition}
                </option>
              );
            })}
        </select>
        <button className='z-20 flex items-center justify-center p-2 rounded-lg bg-green-200 hover:bg-green-300 focus:outline-none active:bg-green-400 text-black' onClick={handlerSendAlert}>
          Send Simulate Alert to App
        </button>
        <p className='w-full text-md sm:text-lg'>Current Beecon Location: {beepconLocation}</p>
      </div>
      <div className='flex flex-col h-full p-8 gap-8'>
        {exhibitions &&
          exhibitions.map((item) => {
            return (
              <div id={`exhibition-${item.id_exhibition}`} key={item.id} className='relative rounded-lg overflow-hidden h-80-screen sm:h-40-screen border border-solid border-white'>
                {item.image && (item.image.includes('.jpg') || item.image.includes('base64')) && (
                  <div className='relative h-full'>
                    <Image className='object-cover' src={item.image} alt={`exhibition-image-${item.id_exhibition}`} layout='fill' />
                  </div>
                )}
                <div className='absolute inset-0 flex flex-col justify-between items-start gap-4 p-4 bg-black bg-opacity-30'>
                  <p className='font-bebas text-3xl'>{item.name_exhibition}</p>
                  <p>{item.author}</p>
                  <p>{item.created_at}</p>
                  <p className='overflow-hidden text-ellipsis'>{item.information}</p>
                  <div className='flex justify-start items-start gap-4'>
                    <button className='rounded-md border border-solid border-white py-2 px-4' onClick={() => router.push(`/exhibition/edit/${item.id_exhibition}`)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className='rounded-md border border-solid border-white py-2 px-4' onClick={() => router.push(`/exhibition/delete/${item.id_exhibition}`)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        <div className='relative rounded-lg overflow-hidden h-10-screen p-4 gap-4 flex justify-start items-center border border-solid border-white'>
          <button className='rounded-md border border-solid border-white py-2 px-4' onClick={() => router.push(`/exhibition/add`)}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
          <p>Add a new exhibition</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
