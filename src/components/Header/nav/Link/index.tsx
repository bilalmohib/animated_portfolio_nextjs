import styles from './style.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../../animation';

export default function Index({ data, isActive, setSelectedIndicator }: { data: any, isActive: any, setSelectedIndicator: any }) {

  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => { setSelectedIndicator(href) }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}>
      </motion.div>
      <Link href={href} className='text-4xl md:text-6xl my-1 md:my-2'>{title}</Link>
    </motion.div>
  )
}