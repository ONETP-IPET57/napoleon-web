import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <RecoilRoot>
      <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
