'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { HiArrowUpRight } from "react-icons/hi2";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import Link from 'next/link';

export default function Header() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);
    const [date, setDate] = useState<string>("...");

    useEffect(() => {
        if (isActive) setIsActive(false)
    }, [pathname])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                // @ts-ignore
                onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }, setIsActive(false)) }
            }
        })
    }, [])

    useEffect(() => {
        let time = new Date().toLocaleTimeString();
        setDate(time)
    }, [])

    return (
        <>
            <nav ref={header} className={`border-solid border-black border-x-0 border-t-0 border-b-[0.5px] fixed top-0 bg-transparent w-full z-10 flex justify-between items-center h-[70px] px-5 ${styles.navbackground}`}>
                <div className='h-[70px] flex flex-col justify-center items-center'>
                    <h3 className='text-black text-xl sm:text-4xl font-medium my-auto'>Muhammad Bilal</h3>
                </div>

                <div className='gap-4 lg:gap-20 hidden md:flex'>
                    <Magnetic>
                        <Link href='/work' className='block hover:underline text-lg hover:text-indigo-600'>Work</Link>
                    </Magnetic>
                    <Magnetic>
                        <Link href='/about' className='block hover:underline text-lg hover:text-indigo-600'>About</Link>
                    </Magnetic>
                    <Magnetic>
                        <Link href='/contact' className='block hover:underline text-lg hover:text-indigo-600'>Contact</Link>
                    </Magnetic>
                </div>

                <div className='flex flex-row gap-6'>
                    <h5 className='h-[70px] hidden sm:flex flex-col justify-center items-center'>{date} / PK</h5>
                    <div className='my-auto'>
                        <Magnetic>
                            <button className='px-2 sm:px-4 py-1 sm:py-2 bg-black rounded-lg text-white'
                                onClick={() => {
                                    // Open in new tab
                                    window.open("https://www.upwork.com/freelancers/~013a136c7081592898")
                                }}
                            >
                                <HiArrowUpRight color='white' className='inline mr-2' />
                                Hire Me
                            </button>
                        </Magnetic>
                    </div>
                </div>
            </nav>
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.button}`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    )
}
