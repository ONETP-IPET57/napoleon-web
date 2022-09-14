import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

const Id = () => {
  const router = useRouter();
  const { action, id } = router.query;

  useEffect(() => {
    if (action === 'delete') {
      fetch('/api/visit/' + id, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          router.push('/user');
        });
    }
  }, [action, id, router]);
  return <div></div>;
};

export default Id;
