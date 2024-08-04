'use client';

import React, { useEffect, useState } from 'react';
import styles from './myQuote.module.css'
import AddQuoteModal from '@/components/ui/AddQuoteModal';
import { IQuote, Quote } from '@/components/ui/interface';
import Link from 'next/link';
import StateModal from '@/components/ui/modal';
import MyQuoteItem from '@/components/ui/MyQuoteItem';
import { toast } from 'react-toastify';
import { addQuote, deleteMyQuote, getMyQuote } from '@/app/lib/actions';
import { convertFromIQuoteToQuote } from '@/components/ui/mapper';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

const MyQuotesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleNavigation = async(id:string) =>{
     router.push(`/myQuote/${id}`);
  }

  const { user, logout } = useAuth();

    useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyQuote(user.username)
        setQuotes(data);
        setTotalPages(2);
      } catch (err) {
        setError(`error occurred: ${err} `);
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, [page]);

  const handleAddQuote = async (newQuote: Quote) => {
    setIsModalOpen(false)
    const iQuote : IQuote ={
      id: newQuote._id,
      content: newQuote.content,
      author: newQuote.author,
      authorSlug: newQuote.authorSlug,
      authorId: newQuote.authorSlug,
      tags: newQuote.tags,
      length: newQuote.length,
      username: user.username,
      dateModified: newQuote.dateModified,
      dateAdded: newQuote.dateAdded
    }
   await addQuote(iQuote)
     
    setQuotes([...quotes, iQuote]);
    toast("Quote Added")
  };

 const handleDelete = async(id:string) =>{
   const status = await deleteMyQuote(id)
   const data = await getMyQuote(user.username)
   setQuotes(data); 
   toast(status)
 }



  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Quotes</h1>
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
      <button className={styles.fab} onClick={() => setIsModalOpen(true)}>
        +
      </button>
      
      {isModalOpen && <AddQuoteModal onClose={() => setIsModalOpen(false) } onAddQuote={handleAddQuote} />}
      
    </div>
  );
};

export default MyQuotesPage;
