'use client';

import React, { useState } from 'react';
import styles from './addQuoteModal.module.css';
import { Quote } from './interface';
import { authors } from '@/app/lib/data';

interface AddQuoteModalProps {
  onClose: () => void;
  onAddQuote: (quote:Quote) => void;
}

const AddQuoteModal: React.FC<AddQuoteModalProps> = ({ onClose, onAddQuote }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = () => {
    const authored = author
    const words = author.split(',');
    const date = new Date();
    const newQuote : Quote = {
      _id: String(Date.now()), // Use a better ID generation in a real scenario
      content,
      author,
      authorSlug: content,
      length: content.length,
      tags: words,
      dateAdded: `${date}`,
      dateModified: `${date}`,
    };
    if(content.length > 0){
      onAddQuote(newQuote);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Add a New Quote</h2>
        <textarea
          placeholder="Quote content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Tags(sepate with comma)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={styles.input}
          required
        />
        <button onClick={handleSubmit} className={styles.addButton}>
          Add Quote
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddQuoteModal;
