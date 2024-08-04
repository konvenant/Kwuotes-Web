'use client';
import React, { useState, useEffect } from 'react'
import styles from './dashboard.module.css'
import { Category, CategoryToSave, Quote } from '@/components/ui/interface';
import CategoryItem from '@/components/ui/CategoryItem';
import QuoteItem from '@/components/ui/QuoteItem';
import Link from 'next/link';
import { getQuotesByCategory } from './api/api';
import StateModal from '@/components/ui/modal';
import { getCategories } from '../lib/actions';
import { useAuth } from '../../contexts/AuthContext';



const Home = () => {

  
const [categories, setCategories] = useState<CategoryToSave[]>([]);

const [selectedIndex,setSelectedIndex] = useState(0);
const handleClick = (id: string) => {
  console.log(`Quote with ID ${id} clicked`);
};

const { user, logout } = useAuth();

const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    const fetchAndLoadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoriesResponse = await getCategories(user?.username);
       
        
        setCategories(categoriesResponse);

        if (categoriesResponse.length > 0) {
          const firstCategory = categoriesResponse[0];
          setSelectedCat(firstCategory.name)
          const data = await getQuotesByCategory(firstCategory.name, page);
          setQuotes(data.results);
          setTotalPages(data.totalPages);
        } else {
          setError('No categories found');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAndLoadData();
  }, []);

  const loadQuotes = async (catName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuotesByCategory(catName,page);
      setQuotes(data.results);
      setTotalPages(data.totalPages);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (name: string,index:number) => {
          setSelectedIndex(index)
          setSelectedCat(name)
          setPage(1)
            const data = await getQuotesByCategory(name,page);
            setQuotes(data.results);
            setTotalPages(data.totalPages);
            
  } 


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (quotes == null) {
    return <div className={styles.container}><p>Quotes for this category not found</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Explore</h1>
      <p className={styles.subheading}>Awesome quotes organised for you in your own categories</p>
      <div className={styles.categoryContainer}>
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          name={category.name}
          quoteCount={category.quoteCount}
          isSelected={selectedIndex === index}
          onClick={(name:string) => {
            setQuotes([])
           handleCategoryClick(name,index)
          }}
        />
      ))}
      </div>

      <div className={styles.quoteList}>
      <StateModal
        isOpen={loading || !!error}
        message={loading ? 'Loading...' : error || ''}
        onClose={() => setError(null)}
      />
      {!loading && !error && (
        <>
      {quotes.map((quote) => (
         <Link key={quote._id} href={`/quote/${quote._id}`}>
        <QuoteItem
          key={quote._id}
          quote={quote}
          onClick={handleClick}
        />
        </Link>
      ))}
      
      {quotes.length > 0 && <div className={styles.pagination}>
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1))
                loadQuotes(selectedCat)
              }}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{page} / {totalPages}</span>
            <button
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages))
                loadQuotes(selectedCat)
              }}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>}

          {quotes.length <= 0 && (
  <div className={styles.notFound}>
    <div className={styles.messageContainer}>
      <h2 className={styles.message}>No Quote Found for this Category</h2>
    </div>
  </div>
)}


      </>
      )}
      </div>
    </div>

  )
}

export default Home
