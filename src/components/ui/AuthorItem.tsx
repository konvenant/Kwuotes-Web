'use client';

import React from 'react';
import styles from './authorItem.module.css';
import { Author } from './interface';

interface AuthorItemProps {
  author: Author
}

const AuthorItem: React.FC<AuthorItemProps> = ({ author }) => {
  return (
    <div className={styles.container} >
      <h2 className={styles.name}>{author.name}</h2>
      <p className={styles.description}>{author.description}</p>
      <p className={styles.quoteCount}>{author.quoteCount} quotes</p>
    </div>
  );
};

export default AuthorItem;
