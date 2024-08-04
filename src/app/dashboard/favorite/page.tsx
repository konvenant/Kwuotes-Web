'use client';

import React, { useState, useEffect } from 'react';
import styles from './favoriteQuotesPage.module.css';
import QuoteItem from '@/components/ui/QuoteItem';
import Link from 'next/link';
import { deleteFavQuote, deleteMyQuote, getFavQuote, getMyQuote } from '@/app/lib/actions';
import { IQuote } from '@/components/ui/interface';
import MyQuoteItem from '@/components/ui/MyQuoteItem';
import { convertFromIQuoteToQuote } from '@/components/ui/mapper';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import StateModal from '@/components/ui/modal';
import { useAuth } from '../../../contexts/AuthContext';

const FavoriteQuotesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [page, setPage] = useState(1);

  const { user, logout } = useAuth();

  useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavQuote(user.username)
        setQuotes(data);
      } catch (err) {
        setError(`error occurred: ${err} `);
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, [page]);


  const router = useRouter();

  const handleNavigation = async(id:string) =>{
     router.push(`/favQuote/${id}`);
  }


  const handleDelete = async(id:string) =>{
    const status = await deleteFavQuote(id)
    const data = await getFavQuote(user.username)
    setQuotes(data); 
    toast(status)
  }

  if(quotes.length < 1){
    return <div>
        <StateModal
        isOpen={true}
        message={"No Quote In Favorite"}
        onClose={() => setError(null)}
      /></div>
  }

  return (
    <div className={styles.container}>
      <h1>Favorite Quotes</h1>
      <div className={styles.quoteList}>
      <StateModal
        isOpen={loading || !!error}
        message={loading ? 'Loading...' : error || ''}
        onClose={() => setError(null)}
      />
      {!loading && !error && (
        <>
        {quotes.map((quote) => (
         <MyQuoteItem key={convertFromIQuoteToQuote(quote)._id} quote={convertFromIQuoteToQuote(quote)} onClick={handleNavigation} onDeleteClick={handleDelete} />
         
        ))}
      
      </>
    )}
      </div>
    </div>
  );
};

export default FavoriteQuotesPage;
