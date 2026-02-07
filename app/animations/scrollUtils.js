import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Create a basic scroll-triggered fade-in animation
 */
export const scrollFadeIn = (element, options = {}) => {
  const {
    duration = 1,
    trigger = element,
    start = 'top 80%',
    end = 'top 20%',
    once = true,
  } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration,
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub: false,
        once,
      },
    }
  );
};

/**
 * Create a scroll-triggered slide-in animation
 */
export const scrollSlideIn = (element, direction = 'left', options = {}) => {
  const {
    duration = 1,
    trigger = element,
    start = 'top 80%',
    once = true,
  } = options;

  const fromValues = {
    left: { opacity: 0, x: -100 },
    right: { opacity: 0, x: 100 },
    top: { opacity: 0, y: -100 },
    bottom: { opacity: 0, y: 100 },
  };

  return gsap.fromTo(
    element,
    fromValues[direction],
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      scrollTrigger: {
        trigger,
        start,
        scrub: false,
        once,
      },
    }
  );
};

/**
 * Create a parallax scroll animation
 */
export const parallaxScroll = (element, speed = 1, options = {}) => {
  const { trigger = element } = options;

  return gsap.to(element, {
    y: () => {
      return (1 - ScrollTrigger.getProgress(trigger)) * 100 * speed;
    },
    scrollTrigger: {
      trigger,
      scrub: 0.5,
    },
    ease: 'none',
  });
};

/**
 * Create a scroll-triggered scale animation
 */
export const scrollScale = (element, finalScale = 1.2, options = {}) => {
  const {
    duration = 1,
    trigger = element,
    start = 'top center',
    once = true,
  } = options;

  return gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: finalScale,
      opacity: 1,
      duration,
      scrollTrigger: {
        trigger,
        start,
        scrub: false,
        once,
      },
    }
  );
};

/**
 * Create a scroll-triggered rotation animation
 */
export const scrollRotate = (element, rotation = 360, options = {}) => {
  const {
    duration = 2,
    trigger = element,
    start = 'top center',
    scrub = 1,
  } = options;

  return gsap.to(element, {
    rotation,
    duration,
    scrollTrigger: {
      trigger,
      start,
      scrub,
    },
  });
};

/**
 * Create a horizontal scroll animation
 */
export const scrollHorizontal = (element, finalX = 200, options = {}) => {
  const {
    duration = 2,
    trigger = element,
    start = 'top center',
    scrub = 1,
  } = options;

  return gsap.to(element, {
    x: finalX,
    duration,
    scrollTrigger: {
      trigger,
      start,
      scrub,
    },
  });
};

/**
 * Create a staggered scroll animation
 */
export const scrollStagger = (elements, options = {}) => {
  const {
    duration = 1,
    staggerAmount = 0.1,
    trigger = elements[0],
    start = 'top 80%',
    once = true,
  } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerAmount,
      scrollTrigger: {
        trigger,
        start,
        scrub: false,
        once,
      },
    }
  );
};

/**
 * Create a pinned animation
 */
export const pinned = (element, duration = 3, options = {}) => {
  const {
    trigger = element,
    start = 'top top',
    endOffset = 500,
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end: `+=${endOffset}`,
      scrub: 1,
      pin: true,
    },
  });

  return tl;
};

/**
 * Kill all scroll triggers
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
