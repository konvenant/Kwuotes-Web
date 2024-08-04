'use client';

import React, { useEffect, useState } from 'react';
import styles from './author.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { authors } from '@/app/lib/data';
import { AuthorSingle } from '@/components/ui/interface';
import { fetchAuthorById } from '@/app/dashboard/api/api';


interface AuthorPageProps {
    params: {
      id: string;
    };
  }

const AuthorDetails: React.FC<AuthorPageProps> = ({ params }) => {
    const { id } = params;
    const [author, setAuthor] = useState<AuthorSingle>();

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await fetchAuthorById(id);
        setAuthor(data);
       
      } catch (error) {
      
      } finally {
     
      }
    };

    loadAuthors();
  }, []); 

  if (!author) {
    return <div className={styles.error}>Author not found</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/dashboard/authors">
        <FaArrowLeft className={styles.backIcon} /> Back to Authors
      </Link>
      <h1 className={styles.name}>{author.name}</h1>
      <p className={styles.bio}>{author.bio}</p>
      <p className={styles.description}>{author.description}</p>
      <p>
        <a href={author.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
          More info
        </a>
      </p>
      <p>Date Added: {author.dateAdded}</p>
      <p>Date Modified: {author.dateModified}</p>
    </div>
  );
};

export default AuthorDetails;
