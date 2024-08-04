'use client';

import React from 'react';
import styles from './quoteItem.module.css';
import { Quote } from './interface';
import { MdDelete } from 'react-icons/md';

interface QuoteProps {
  quote: Quote;
  onClick: (id: string) => void;
  onDeleteClick: (id: string) => void
}

const MyQuoteItem: React.FC<QuoteProps> = ({ quote, onClick,onDeleteClick }) => {
  return (
    <div className={styles.container} >
      <div className={styles.deleteIcon}> <MdDelete size={28} onClick={()=> onDeleteClick(quote._id)}/></div>
      <p className={styles.content} onClick={() => onClick(quote._id)}>{quote.content}</p>
      <p className={styles.author} onClick={() => onClick(quote._id)}>- {quote.author}</p>
      <div className={styles.tags} onClick={() => onClick(quote._id)}>
        {quote.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default MyQuoteItem;
