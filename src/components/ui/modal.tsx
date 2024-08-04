// components/Modal.tsx

import React from 'react';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const StateModal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StateModal;
