import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useExhibitions from '../hooks/useExhibitions';

const AdminDashboard = () => {
  const router = useRouter();
  const exhibitions = useExhibitions();

  return (
    <div className='flex flex-col h-full p-8 gap-8'>
      {exhibitions &&
        exhibitions.map((item) => {
          return (
            <div id={`exhibition-${item.id_exhibition}`} key={item.id} className='relative rounded-lg overflow-hidden h-30-screen border border-solid border-white'>
              {item.image && (item.image.includes('.jpg') || item.image.includes('base64')) && (
                <div className='relative h-full'>
                  <Image className='object-cover' src={item.image} alt={`exhibition-image-${item.id_exhibition}`} layout='fill' />
                </div>
              )}
              <div className='absolute inset-0 flex flex-col justify-between items-start gap-4 p-4 bg-black bg-opacity-30'>
                <p className='font-bebas text-3xl'>{item.name_exhibition}</p>
                <p>{item.author}</p>
                <p>{item.created_at}</p>
                <p className=''>{item.information}</p>
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
  );
};

export default AdminDashboard;
