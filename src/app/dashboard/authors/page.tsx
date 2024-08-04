'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './authorPage.module.css';
import AuthorItem from '@/components/ui/AuthorItem';
import { FaSearch } from 'react-icons/fa';
import { Author } from '@/components/ui/interface';
import Link from 'next/link';
import { fetchAuthors, searchAuthors } from '../api/api';
import StateModal from '@/components/ui/modal';
import { MdClose } from 'react-icons/md';

const AuthorPage: React.FC = () => {

  const [authors, setAuthors] = useState<Author[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState(authors[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cancelSearch, setCancelSearch] = useState(false)


  const loadAuthors = async () => {
    try {
      const data = await fetchAuthors(page);
      setAuthors(data.results);
      setTotalPages(data.totalPages)
    } catch (error) {
      setError('Failed to fetch authors.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    loadAuthors();
  }, [page]); 

  const handleAuthorClick = (author:Author) => {
    setSelectedAuthor(author);
  };

  const handleCloseDetails = () => {
    // setSelectedAuthor(authors);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  
  const handleSearch = async () => {
    setLoading(true);
      setError(null);
    try {
      const data = await searchAuthors(searchQuery,page)
      setAuthors(data.results);
      setTotalPages(data.totalPages);
      console.log("data:",data)
      setCancelSearch(true)
    } catch (err) {
      setError(`error occurred: ${err} `);
      console.log("err:",err)
    } finally {
      setLoading(false);
    }
  };

 const handleCancelSearch = async () =>{
    setCancelSearch(false)
    loadAuthors()
  }

  const listRef = useRef(null);

  // Handler for the button click
  // const scrollToFirstItem = () => {
  //   if (listRef.current) {
  //     const firstItem = listRef.current.firstChild; // Assuming first item
  //     if (firstItem) {
  //       firstItem.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smooth scroll to top
  //     }
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search authors..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        {cancelSearch ? 
        <MdClose className={styles.searchIcon} onClick={handleCancelSearch}/> 
        : <FaSearch className={styles.searchIcon} onClick={handleSearch}/>}
      </div>
      <h1 className={styles.heading}>Authors</h1>
      <div className={styles.authorList} ref={listRef}>
      <StateModal
        isOpen={loading || !!error}
        message={loading ? 'Loading...' : error || ''}
        onClose={() => setError(null)}
      />
      {!loading && !error && (
        <>
        {authors.map((author,index) => (
            <Link key={author._id} href={`/author/${author._id}`} >
          <AuthorItem key={author._id} author={author} />
          </Link>
        ))}

</>
)}
{authors.length > 0 && 
<div className={styles.pagination}>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{page} / {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>}
      </div>
      


    </div>
  );
};

export default AuthorPage;
