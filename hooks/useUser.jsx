import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userAtoms';
import { useRouter } from 'next/router';

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user && Object.keys(user).length === 0) {
      router.push('/user/login');
    }
  }, [user, router]);

  return { user, setUser };
};

export default useUser;
