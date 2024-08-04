// pages/api/quotes.js
import axios from 'axios';
import { AuthorResponse, AuthorSearchResponse, AuthorSingle, Category, CategoryToSave, IQuote, Quote, QuoteResponse, SearchQuoteResponse, Tag } from '@/components/ui/interface';



export const getQuotesByCategory = async (category: string,page: number): Promise<QuoteResponse> => {
  const response = await axios.get<QuoteResponse>(`https://api.quotable.io/quotes?tags=${category}&page=${page}`);
  return response.data;
};


export const getQuoteById = async (id:string): Promise<Quote> => {
  const response = await axios.get<Quote>(`https://api.quotable.io/quotes/${id}`);
  return response.data;
};

export const searchForQuotes = async (query:String,page: number): Promise<SearchQuoteResponse> => {
  const response = await axios.get<SearchQuoteResponse>(`https://api.quotable.io/search/quotes?query=${query}&page=${page}`);
  console.log(response.data);
  
  return response.data;
};

export const searchForQuotesUsingAuthorField = async (query:String,page: number): Promise<QuoteResponse> => {
  const response = await axios.get<QuoteResponse>(`https://api.quotable.io/quotes?author=${query}&page=${page}`);
  console.log(response.data);
  
  return response.data;
};

export const fetchAuthors = async (page:number): Promise<AuthorResponse> => {
    const response = await axios.get<AuthorResponse>(`https://api.quotable.io/authors?page=${page}`);
    return response.data;
};


export const fetchAuthorById = async (id:String): Promise<AuthorSingle> => {
  const response = await axios.get<AuthorSingle>(`https://api.quotable.io/authors/${id}`);
  return response.data;
};


export const searchAuthors = async (query:String,page:number): Promise<AuthorSearchResponse> => {
  const response = await axios.get<AuthorSearchResponse>(`https://api.quotable.io/search/authors?query=${query}&page=${page}`);
  return response.data;
};

// export const getTags = async() : Promise<Tag> => {
//   const response = await axios.get<>
// }

