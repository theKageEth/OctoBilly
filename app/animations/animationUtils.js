import gsap from 'gsap';

/**
 * Create a bounce effect animation
 */
export const createBounceAnimation = (element, duration = 1, repeat = -1) => {
  return gsap.to(element, {
    y: -20,
    duration: duration / 2,
    repeat: repeat,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Create a fade in animation
 */
export const fadeIn = (element, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration, delay, ease: 'power2.out' }
  );
};

/**
 * Create a fade out animation
 */
export const fadeOut = (element, duration = 1, delay = 0) => {
  return gsap.to(element, { opacity: 0, duration, delay, ease: 'power2.in' });
};

/**
 * Create a slide in from left animation
 */
export const slideInFromLeft = (element, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -100 },
    { opacity: 1, x: 0, duration, delay, ease: 'power2.out' }
  );
};

/**
 * Create a slide in from right animation
 */
export const slideInFromRight = (element, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration, delay, ease: 'power2.out' }
  );
};

/**
 * Create a slide in from top animation
 */
export const slideInFromTop = (element, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: -100 },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
};

/**
 * Create a slide in from bottom animation
 */
export const slideInFromBottom = (element, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
};

/**
 * Create a scale up animation
 */
export const scaleUp = (element, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0 },
    { opacity: 1, scale: 1, duration, delay, ease: 'back.out' }
  );
};

/**
 * Create a rotate animation
 */
export const rotate = (element, rotation = 360, duration = 1, repeat = -1) => {
  return gsap.to(element, {
    rotation,
    duration,
    repeat,
    ease: 'linear',
  });
};

/**
 * Create a floating animation
 */
export const float = (element, distance = 20, duration = 2, repeat = -1) => {
  return gsap.to(element, {
    y: -distance,
    duration,
    repeat,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerIn = (elements, duration = 1, delay = 0.1) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: delay,
      ease: 'power2.out',
    }
  );
};

/**
 * Pulse animation
 */
export const pulse = (element, intensity = 1.1, duration = 1, repeat = -1) => {
  return gsap.to(element, {
    scale: intensity,
    duration: duration / 2,
    repeat,
    yoyo: true,
    ease: 'sine.inOut',
  });
};
