'use client';

import React from 'react';
import styles from './quoteItem.module.css';
import { Quote } from './interface';

interface QuoteProps {
  quote: Quote;
  onClick: (id: string) => void;
}

const QuoteItem: React.FC<QuoteProps> = ({ quote, onClick }) => {
  return (
    <div className={styles.container} onClick={() => onClick(quote._id)}>
      <p className={styles.content}>{quote.content}</p>
      <p className={styles.author}>- {quote.author}</p>
      <div className={styles.tags}>
        {quote.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default QuoteItem;
