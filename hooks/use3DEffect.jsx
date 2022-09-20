import { useSpring, useTransform } from 'framer-motion';

const use3DEffect = () => {
  const x = useSpring(0, { mass: 1.5, stiffness: 200, damping: 20 });
  const y = useSpring(0, { mass: 1.5, stiffness: 200, damping: 20 });
  const scale = useSpring(1, { mass: 1.5, stiffness: 200, damping: 20 });
  const rotateX = useTransform(x, [-10, 10], [-15, 15]);
  const rotateY = useTransform(y, [-10, 10], [15, -15]);

  const calc = (top, left, width, height, x, y) => [-((top + height / 2 - y) / (height / 2)) * 10, -((left + width / 2 - x) / (width / 2)) * 10];

  return {
    style: { rotateX, rotateY, scale },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
      scale.set(1);
    },
    onMouseMove: (e) => {
      const { pageX, pageY, target } = e;
      const { top, left, width, height } = target.getBoundingClientRect();
      const fix = calc(top, left, width, height, pageX, pageY);
      x.set(fix[0]);
      y.set(fix[1]);
      scale.set(1.05);
    },
  };
};

export default use3DEffect;
