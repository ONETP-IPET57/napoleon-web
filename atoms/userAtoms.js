import { atom } from 'recoil';

export const sessionState = atom({
  key: 'sessionAtom',
  default: {},
});

export const userState = atom({
  key: 'userAtom',
  default: {},
});
