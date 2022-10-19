import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useRecoilValue } from 'recoil';
import { speakerState } from '../atoms/userAtoms';

export default function useSpeak() {
  const router = useRouter();
  const locale = router.locale;
  const { speak, voices, cancel } = useSpeechSynthesis();
  const speaker = useRecoilValue(speakerState);

  const handlerSpeech = useCallback(
    (text) =>
      speak({
        text,
        voice: voices.find((item) => {
          return item.lang.includes(locale);
        }),
      }),
    [locale, speak, voices]
  );

  const createAttr = useCallback(
    (text) => {
      return {
        'onMouseEnter': () => {
          if (!speaker) return;
          cancel();
          handlerSpeech(text);
        },
        'onMouseLeave': cancel,
        'onTouchStart': () => {
          if (!speaker) return;
          cancel();
          handlerSpeech(text);
        },
        'onTouchEnd': cancel,
      };
    },
    [handlerSpeech, cancel]
  );

  return createAttr;
}
