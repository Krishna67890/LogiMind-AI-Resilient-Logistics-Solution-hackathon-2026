import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animatePage = () => {
  // Reveal sections on scroll
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    reveals.forEach((el) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      });
    });
  }

  // Pulse effect for the "Live" system status
  if (document.querySelector(".status-dot")) {
    gsap.to(".status-dot", {
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }

  // Staggered reveal for metrics/cards
  if (document.querySelector(".stat-card")) {
    gsap.from(".stat-card", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power4.out"
    });
  }
};
