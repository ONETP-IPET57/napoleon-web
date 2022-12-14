import { faFacebook, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { motion } from 'framer-motion';
import useSpeak from '../hooks/useSpeak';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const createAttr = useSpeak();
  const { t } = useTranslation('container');

  return (
    <footer className='h-30-screen relative border-t border-t-solid border-t-white flex flex-col sm:flex-row gap-8 p-8 justify-between items-center'>
      <p className='font-bebas text-4xl'>NAPOLEÓN</p>
      <div className='flex flex-col gap-4 justify-center items-center'>
        <p className='text-md sm:text-lg' {...createAttr(t('footer.follow_us'))}>
          {t('footer.follow_us')}
        </p>
        <div className='flex gap-4'>
          <motion.a href='https://www.facebook.com' target='_blank' className='p-4 border border-solid border-white rounded-full aspect-square' initial={{ borderColor: 'rgb(51, 51, 51)' }} whileHover={{ borderColor: 'rgb(255, 255, 255)' }} {...createAttr('Facebook')}>
            <FontAwesomeIcon icon={faFacebookF} size='2x' className='aspect-square' />
          </motion.a>
          <motion.a href='https://www.instagram.com' target='_blank' className='p-4 border border-solid border-white rounded-full aspect-square' initial={{ borderColor: 'rgb(51, 51, 51)' }} whileHover={{ borderColor: 'rgb(255, 255, 255)' }} {...createAttr('Instagram')}>
            <FontAwesomeIcon icon={faInstagram} size='2x' className='aspect-square' />
          </motion.a>
          <motion.a href='https://www.twitter.com' target='_blank' className='p-4 border border-solid border-white rounded-full aspect-square' initial={{ borderColor: 'rgb(51, 51, 51)' }} whileHover={{ borderColor: 'rgb(255, 255, 255)' }} {...createAttr('Twitter')}>
            <FontAwesomeIcon icon={faTwitter} size='2x' className='aspect-square' />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
