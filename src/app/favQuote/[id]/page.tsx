'use client';

import React, { useState, useEffect } from 'react';
import styles from '../favQuote.module.css';
import { FaHeart } from 'react-icons/fa';
import Header from '@/components/ui/Header';
import { MdOutlineHeartBroken, MdShare } from 'react-icons/md';
import { IQuote, Quote } from '@/components/ui/interface';
import { getMyQuoteUsingId } from '@/app/lib/data';
import { addMyQuoteToFavorite, getFavQuoteById, isFavorite, removeMyQuoteFromFavorite } from '@/app/lib/actions';
import { toast } from 'react-toastify';


// import { getMyQuoteById } from '@/app/lib/actions';

interface QuotePageProps {
  params: {
    id: string;
  };
}

const QuotePage: React.FC<QuotePageProps> = ({ params }) => {
  const [quote, setQuote] = useState<IQuote | null>(null);
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getFavQuoteById(id);
        setQuote(data);
        const favorite = await isFavorite(id)
        setIsFav(favorite)
      } catch (error) {
        console.error('Error fetching quote:', error);
        setError('An error occurred while fetching the quote.'); // More specific error message
      } finally {
        setLoading(false);
      }
    };

    loadQuotes();
  }, [id]);

  if (loading) {
    return <div className={styles.notFound}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.notFound}>{error}</div>;
  }

  if (quote == null) {
    return <div className={styles.notFound}>Quote not found</div>;
  }

  const addToFav = async () => {
    const iQuote: IQuote = {
      id: quote.id,
      content: quote.content,
      author: quote.author,
      authorSlug: quote.authorSlug,
      authorId: quote.authorId,
      tags: quote.tags,
      length: quote.length,
      dateAdded: quote.dateAdded,
      dateModified: quote.dateModified,
      username: quote.username
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

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.favoriteIcon}>
          { isFav ? <FaHeart size={24} onClick={removeFromFav} /> : <MdOutlineHeartBroken size={24} onClick={addToFav} />}
        </div>

        <p className={styles.content}>{quote.content}</p>
        <p className={styles.author}>- {quote.author}</p>
        <p className={styles.datePosted}>Posted on: {quote.dateModified?.slice(0,21)}</p>
      </div>

      <div className={styles.fab}>
        <MdShare size={24} onClick={()=>{toast("coming soon")}} />
      </div>
    </div>
  );
};

export default QuotePage;
