'use client';

import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import styles from './search.module.css';
import QuoteItem from '@/components/ui/QuoteItem';
import Link from 'next/link';
import { Quote, SearchQuote } from '@/components/ui/interface';
import { searchForQuotes, searchForQuotesUsingAuthorField } from '../api/api';
import StateModal from '@/components/ui/modal';
import { convertSearchQuoteToQuote } from '@/components/ui/mapper';

const SearchPage: React.FC = () => {
  const [quotes, setQuotes] = useState<SearchQuote[]>([]);
  const [quotesByAuthors, setQuotesByAuthors] = useState<Quote[]>([]);
  const [searchType, setSearchType] = useState<'author' | 'content'>('content');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(quotes);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setLoading(true);
      setError(null);
    try {
      const data = await searchForQuotes(query,page)
      setQuotes(data.results);
      setTotalPages(data.totalPages);
      console.log("data:",data)
    } catch (err) {
      setError(`error occurred: ${err} `);
      console.log("err:",err)
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorsSearch = async () => {
    setLoading(true);
      setError(null);
    try {
      const data = await searchForQuotesUsingAuthorField(query,page)
      setQuotesByAuthors(data.results);
      setTotalPages(data.totalPages);
      console.log("data:",data)
    } catch (err) {
      setError(`error occurred: ${err} `);
      console.log("err:",err)
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchSearchType = () => {
    setSearchType(searchType === 'content' ? 'author' : 'content');
    setQuery("")
    setQuotes([])
    setQuotesByAuthors([])
  };

  const handlePagination = () => {

  }

  const handleClick = () => {
    console.log("clicked");
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <button onClick={handleSwitchSearchType} className={styles.switchButton}>
          <FaFilter />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search by ${searchType}`}
          className={styles.searchInput}
        />
        <button onClick={searchType === "content" ? handleSearch: handleAuthorsSearch} className={styles.searchButton}>
          <FaSearch />
        </button>
      </div>
      <StateModal
        isOpen={loading || !!error}
        message={loading ? 'Loading...' : error || ''}
        onClose={() => setError(null)}
      />
      {!loading && !error && (
        <>
      <div className={styles.results}>
        {
        searchType === "content" ? 
           quotes.map((searchQuote) => (
          
            <Link key={searchQuote._id} href={`/quote/${searchQuote._id}`}>
            <QuoteItem
              key={searchQuote._id}
              quote={convertSearchQuoteToQuote(searchQuote)}
              onClick={handleClick}
            />
            </Link>
           
          )):
          quotesByAuthors.map((quote) => (
          
            <Link key={quote._id} href={`/quote/${quote._id}`}>
            <QuoteItem
              key={quote._id}
              quote={quote}
              onClick={handleClick}
            />
            </Link>
           
          ))
        }


     
{quotes.length > 0 && (
  <div className={styles.pagination}>
    <button
      onClick={async () => {
        setPage((prev) => {
          const newPage = Math.max(prev - 1, 1);
          handleSearch(); // Pass the new page to handleSearch
          return newPage;
        });
      }}
      disabled={page === 1}
    >
      Previous
    </button>
    <span>{page} / {totalPages}</span>
    <button
      onClick={async () => {
        setPage((prev) => {
          const newPage = Math.min(prev + 1, totalPages);
          handleSearch(); // Pass the new page to handleSearch
          return newPage;
        });
      }}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
)}

{quotesByAuthors.length > 0 && (
  <div className={styles.pagination}>
    <button
      onClick={async () => {
        setPage((prev) => {
          const newPage = Math.max(prev - 1, 1);
          handleAuthorsSearch(); // Pass the new page to handleSearch
          return newPage;
        });
      }}
      disabled={page === 1}
    >
      Previous
    </button>
    <span>{page} / {totalPages}</span>
    <button
      onClick={async () => {
        setPage((prev) => {
          const newPage = Math.min(prev + 1, totalPages);
          handleAuthorsSearch(); // Pass the new page to handleSearch
          return newPage;
        });
      }}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
)}


      </div>
      </>
      )}
    </div>
  );
};

export default SearchPage;
