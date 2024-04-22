import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation';
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  /*   {
      title: "Work",
      href: "/work",
    },
    {
      title: "About",
      href: "/about",
    }, */
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Blog",
    href: "https://www.linkedin.com/newsletters/6945124839913320448/"
  }
]

export default function HeaderNav() {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div onMouseLeave={() => { setSelectedIndicator(pathname) }} className={styles.nav}>
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {
            navItems.map((data, index) => {
              return (
                // In case of /blog we will use a normal anchor tag
                (data.href.includes("http")) ?
                  <a key={index} href={data.href} target="_blank" rel="noreferrer"
                    className={`${selectedIndicator == data.href ? styles.active : ""} 
                      ${styles.link}
                      text-4xl
                    `}
                  >
                    {data.title}
                  </a>
                  : <Link
                    key={index}
                    data={{ ...data, index }}
                    isActive={selectedIndicator == data.href}
                    setSelectedIndicator={setSelectedIndicator}
                  >
                  </Link>
              )
            })
          }
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  )
}