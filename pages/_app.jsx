import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  return (
    <RecoilRoot>
      <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
