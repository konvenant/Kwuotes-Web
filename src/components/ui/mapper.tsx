import { IQuote, Quote, SearchQuote } from "./interface";

export function convertSearchQuoteToQuote(searchQuote: SearchQuote): Quote {
    const { _id, author, content, tags, authorSlug, length, dateAdded, dateModified } = searchQuote;
    
    const quote: Quote = {
      _id,
      author,
      content,
      tags,
      authorSlug,
      length,
      dateAdded,
      dateModified
    };
  
    return quote;
  }


  export const convertFromIQuoteToQuote = (iQuote: IQuote): Quote => {
    return {
      _id: iQuote.id,
      author: iQuote.author,
      content: iQuote.content,
      tags: iQuote.tags,
      authorSlug: iQuote.authorSlug,
      length: iQuote.length,
      dateAdded: iQuote.dateAdded,
      dateModified: iQuote.dateModified,
    };
  };
  