'use client';
import React from 'react';
import styles from './categoryItem.module.css';
import { Category } from './interface';


// Destructure and type the props in the CategoryItem component
const CategoryItem: React.FC<Category> = ({ name, quoteCount, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ''}`}
      onClick={() => onClick(name)}
    >
      <p className={styles.categoryName}>{name}</p>
      <p className={styles.quoteCount}>{quoteCount}</p>
    </div>
  );
};

export default CategoryItem;
