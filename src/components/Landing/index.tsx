'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import Magnetic from '@/common/Magnetic';

export default function Landing() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    })
    requestAnimationFrame(animate);
  }, [])

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    }
    else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent })
    gsap.set(secondText.current, { xPercent: xPercent })
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  }

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      {/* <Image
        src="/images/background.jpg"
        fill={true}
        alt="background"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Freelance Developer -</p>
          <p ref={secondText}>Freelance Developer -</p>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white" />
        </svg>
        <p>Freelance</p>
        <p>Designer & Developer</p>
      </div> */}
      <div className='w-full mt-[70px] flex flex-col'>
        <div className='flex flex-row justify-between px-5'>
          <div>
            <h1 className='text-8xl font-medium mt-40'>
              <span className='text-black'>Full Stack</span> <br />
              <span className='text-blue-500'>Web</span>
              <span className='text-indigo-500 ml-6'>Developer</span>
            </h1>
            <p className='mt-6 pr-52'>
              Programming is not about what you know, it&apos;s about what you can figure out.
            </p>
          </div>
          <div className='h-[90vh] flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center h-full'>
              <div>
                <h5 className='w-80 text-xl'>A full stack software developer specialized in creating websites, products and systems <span className='text-green-700'>frontend</span> to <span className='text-indigo-700'>backend</span> from scratch</h5>
              </div>
              <hr className='my-4 border border-t-0 border-x-0 border-b-[1px] border-solid border-gray-600 w-full' />
              <div className='flex gap-4'>
                <Magnetic>
                  <button className='border border-solid border-black hover:bg-black hover:text-white py-2 px-4 transition duration-300 ease-in-out'>Contact</button>
                </Magnetic>
                <Magnetic>
                  <button className='border border-solid border-black hover:bg-black hover:text-white py-2 px-4 transition duration-300 ease-in-out'>Projects</button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
