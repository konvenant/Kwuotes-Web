'use client';

import React, { useState, useEffect } from 'react';
import styles from '../quote.module.css'
import { FaHeart } from 'react-icons/fa';
import Header from '@/components/ui/Header';
import { MdOutlineHeartBroken, MdShare } from 'react-icons/md';
import { IQuote, Quote } from '@/components/ui/interface';
import { getQuoteById } from '@/app/dashboard/api/api';
import { addMyQuoteToFavorite, removeMyQuoteFromFavorite } from '@/app/lib/actions';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';

interface QuotePageProps {
  params: {
    id: string;
  };
}

const QuotePage: React.FC<QuotePageProps> = ({ params }) => {

  const [quote, setQuote] = useState<Quote| null>(null);
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);

  const { user, logout } = useAuth();
  useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getQuoteById(id)
        setQuote(data);
        console.log(data);
        
      } catch (err) {
        setError("error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  });


  

  if (quote == null) {
    return <div className={styles.notFound}>Quote not found</div>;
  }

  const addToFav = async () => {
    const iQuote: IQuote = {
      id: quote._id,
      content: quote.content,
      author: quote.author,
      authorSlug: quote.authorSlug,
      authorId: quote.authorSlug,
      tags: quote.tags,
      length: quote.length,
      dateAdded: quote.dateAdded,
      dateModified: quote.dateModified,
      username: user.username
    }
      try {
        await addMyQuoteToFavorite(iQuote)
        toast("Quote added to favorite")
        setIsFav(true)
      } catch (error) {
        await addMyQuoteToFavorite(iQuote)
        toast("Error Adding Quote to Favorite")
      }

  };

  const removeFromFav = async () => {
    try {
      await removeMyQuoteFromFavorite(id);
      toast("Quote removed from favorite")
      setIsFav(false)
    } catch (error) {
      toast("Error Removing Quote to Favorite")
    }
  }

  const handleClick = async function name() {
    
  }

  return (
  <div className={styles.page}>
      <Header />
      <div className={styles.container}>
       
      <div className={styles.favoriteIcon}>
          { isFav ? <FaHeart size={24} onClick={removeFromFav} /> : <MdOutlineHeartBroken size={24} onClick={addToFav} />}
        </div>
      
      <p className={styles.content}>{quote.content}</p>
      <p className={styles.author}>- {quote.author}</p>
      <p className={styles.datePosted}>Posted on: {quote.dateModified}</p>
    </div>

    <div className={styles.fab}>
       <MdShare size={24} onClick={()=>{toast("coming soon")}} />
       </div>
  </div>
  );
};

export default QuotePage;
