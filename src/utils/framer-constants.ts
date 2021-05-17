import { Variants } from "framer-motion";

const easing = [0.6, -0.05, 0.01, 0.99];

export const fadeInUp: Variants = {
  initial: {
    y: 60,
    opacity: 0,
  },

  exit: {
    y: -10,
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easing,
    },
  },
};

export const fadeInLeft: Variants = {
  initial: {
    x: 60,
    opacity: 0,
  },

  exit: {
    x: -10,
    opacity: 0,
  },

  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easing,
    },
  },
};

export const stagger: Variants = {
  initial: {
    opacity: 0,
  },

  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
      delayChildren: 0.02,
    },
  },

  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};
