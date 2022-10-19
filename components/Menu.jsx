import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { speakerState } from '../atoms/userAtoms';
import use3DEffect from '../hooks/use3DEffect';
import useSpeak from '../hooks/useSpeak';

const Menu = ({ visibility, toggleMenuVisibility }) => {
  const router = useRouter();
  const { t } = useTranslation('container');
  const createAttr = useSpeak();
  const [speaker, setSpeaker] = useRecoilState(speakerState);

  const attr = use3DEffect();

  const transition = {
    type: 'spring',
    bounce: 0,
    duration: 0.25,
  };

  const menuParentVariants = {
    'initial': { opacity: 0, x: '-100%' },
    'show': { opacity: 1, x: '0', transition: { staggerChildren: 0.1, delayChildren: 0.25, ...transition } },
  };

  const menuChildrensVariants = {
    'initial': { opacity: 0, x: '-20%' },
    'show': { opacity: 1, x: 0 },
  };

  const onClickItem = (func) => {
    toggleMenuVisibility();
    if (func) func();
  };

  const changeLanguage = () => {
    router.push(router.basePath, null, { locale: router.locale === 'es' ? 'en' : 'es' });
  };

  return (
    <motion.div className='fixed inset-0 z-50 w-full h-full p-12 gap-12 backdrop-blur-lg flex flex-col justify-start items-start text-5xl sm:text-6xl font-bebas' variants={menuParentVariants} initial='initial' animate={visibility ? 'show' : 'initial'} exit='initial'>
      <motion.button variants={menuChildrensVariants} onClick={() => onClickItem(() => router.push('/guided_tours'))} {...createAttr(t('menu.guided_tours'))}>
        <motion.p {...attr}>{t('menu.guided_tours')}</motion.p>
      </motion.button>
      <motion.button variants={menuChildrensVariants} onClick={() => onClickItem(() => router.push('/exhibitions'))} {...createAttr(t('menu.exhibitions'))}>
        <motion.p {...attr}>{t('menu.exhibitions')}</motion.p>
      </motion.button>
      <motion.button variants={menuChildrensVariants} onClick={() => onClickItem(changeLanguage)} {...createAttr(t('menu.change_language'))}>
        <motion.p {...attr}>{t('menu.change_language')}</motion.p>
      </motion.button>
      <motion.button variants={menuChildrensVariants} onClick={() => setSpeaker(!speaker)} {...createAttr(speaker ? t('menu.speaker.disable') : t('menu.speaker.enable'))}>
        <motion.p {...attr}>{speaker ? t('menu.speaker.disable') : t('menu.speaker.enable')}</motion.p>
      </motion.button>
      <motion.button variants={menuChildrensVariants} onClick={toggleMenuVisibility} {...createAttr(t('menu.back'))}>
        <motion.p {...attr}>{t('menu.back')}</motion.p>
      </motion.button>
    </motion.div>
  );
};

export default Menu;
