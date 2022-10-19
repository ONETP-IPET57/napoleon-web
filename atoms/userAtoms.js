import { atom } from 'recoil';

export const sessionState = atom({
  key: 'sessionAtom',
  default: {},
});

export const userState = atom({
  key: 'userAtom',
  default: {},
});

export const accessTokenState = atom({
  key: 'accessTokenAtom',
  default: '',
});

export const speakerState = atom({
  key: 'speakerState',
  default: true,
});
