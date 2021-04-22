import React from 'react'
import styles from './Content.module.scss';

const ContentComponent = ({ children }) => (
    <div className={styles.content}>
        {children}
    </div>
)

export default ContentComponent;
