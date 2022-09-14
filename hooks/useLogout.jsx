import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, userState } from '../atoms/userAtoms';
import Router from 'next/router';

const useLogout = ({ redirectTo } = {}) => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [user, setUser] = useRecoilState(userState);

  fetch('/api/logout', {
    method: 'POST',
  }).then((res) => {
    setAccessToken('');
    setUser({});
    if (redirectTo) {
      Router.push(redirectTo);
    }
  });

  return true;
};

export default useLogout;
