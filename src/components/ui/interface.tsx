export interface Category {
  name: string;
  quoteCount: number;
  isSelected: boolean;
  onClick: (name: string) => void;
}

export interface Quote {
  _id: string;
  author: string;
  content: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface SearchQuote {
  _id: string;
  author: string;
  content: string;
  tags: string[];
  authorSlug: string;
  authorId: string,
  length: number;
  dateAdded: string;
  dateModified: string;
}


export interface QuoteResponse {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Quote[];
}

export interface SearchQuoteResponse {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: SearchQuote[];
}

export interface Author {
    _id: string;
    name: string;
    bio: string;
    description: string;
    link: string;
    quoteCount: number;
    slug: string;
    dateAdded: string;
    dateModified: string;
}


export interface CategoryToSave {
  id: string;
  name: string;
  quoteCount: number;
  dateAdded?: string;
  dateModified?: string;
}


export interface Tag {
  _id: string;
  name: string;
  quoteCount: number;
  dateAdded?: string;
  dateModified?: string;
}


export interface AuthorResponse {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Author[];
}

export interface AuthorSingle {
  _id: string;
  name: string;
  bio: string;
  description: string;
  link: string;
  quoteCount: number;
  slug: string;
  dateAdded: string;
  dateModified: string;
  quotes: Quote[];
}

export interface AuthorSearch {
  _id: string;
  name: string;
  bio: string;
  description: string;
  link: string;
  quoteCount: number;
  slug: string;
  dateAdded: string;
  dateModified: string;
}

export interface AuthorSearchResponse {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: AuthorSearch[];
}



export interface IQuote {
  id: string;
  content: string;
  author: string;
  authorSlug: string;
  authorId: string;
  tags: string[];
  length: number;
  dateAdded: string;
  dateModified: string;
  username: string;
}

