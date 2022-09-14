import React from 'react';
import useLogout from '../../hooks/useLogout';

const Logout = () => {
  useLogout({ redirectTo: '/' });
  return <div></div>;
};

export default Logout;
