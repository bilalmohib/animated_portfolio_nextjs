'use client';
import React from 'react'
import styles from './style.module.scss';

interface ProjectProps {
    index: number;
    title: string;
    category: string;
    link: string,
    manageModal: (active: boolean, index: number, x: number, y: number, link: string) => void;
}

const ProjectNew = (
    {
        index,
        title,
        category,
        link,
        manageModal
    }: ProjectProps) => {

    return (
        <div onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY, link) }} onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY, link) }} className={styles.project}>
            <h2>{title}</h2>
            <p>{category}</p>
        </div>
    )
}
export default ProjectNew;
