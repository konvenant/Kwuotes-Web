import { Author, Category, CategoryToSave, IQuote, Quote } from "@/components/ui/interface";
import { connectToDB } from "./utils";
import { MyQuote } from "./model";
import { getMyQuoteById } from "./actions";


const dummyCategories: CategoryToSave[] = [
  { id: '1', name: 'Inspiration', quoteCount: 12, dateAdded: '2022-01-01', dateModified: '2022-01-01', username: 'user1' },
  { id: '2', name: 'Life', quoteCount: 25, dateAdded: '2022-01-01', dateModified: '2022-01-01', username: 'user2' },
  { id: '3', name: 'Motivation', quoteCount: 15, dateAdded: '2022-01-01', dateModified: '2022-01-01', username: 'user3' },
  { id: '4', name: 'Love', quoteCount: 8, dateAdded: '2022-01-01', dateModified: '2022-01-01', username: 'user4' },
  { id: '5', name: 'Wisdom', quoteCount: 20, dateAdded: '2022-01-01', dateModified: '2022-01-01', username: 'user5' },
];


  export const authors: Author[] = [
    {
      _id: '76ISAUD3P5',
      name: '14th Dalai Lama',
      bio: 'The 14th Dalai Lama (né Lhamo Thondup), known as Gyalwa Rinpoche to the Tibetan people, is the current Dalai Lama, the highest spiritual leader and former head of state of Tibet. Born on 6 July 1935, or in the Tibetan calendar, in the Wood-Pig Year, 5th month, 5th day. He is considered a living Bodhisattva; specifically, an emanation of Avalokiteśvara in Sanskrit and Chenrezig in Tibetan.',
      description: 'Current foremost spiritual leader of Tibet',
      link: 'https://en.wikipedia.org/wiki/14th_Dalai_Lama',
      quoteCount: 0,
      slug: '14th-dalai-lama',
      dateAdded: '2022-07-06',
      dateModified: '2022-07-06',
    },
    {
      _id: '83KJDHEW9S',
      name: 'Albert Einstein',
      bio: 'Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. His work is also known for its influence on the philosophy of science. He received the 1921 Nobel Prize in Physics "for his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect".',
      description: 'Theoretical physicist who developed the theory of relativity',
      link: 'https://en.wikipedia.org/wiki/Albert_Einstein',
      quoteCount: 5,
      slug: 'albert-einstein',
      dateAdded: '2022-07-06',
      dateModified: '2022-07-06',
    },
    // Add more authors as needed
  ];
  

  export const getMyQuoteUsingId = async ( id: string): Promise<IQuote> => {
    const quote = await getMyQuoteById(id)

    return quote;
  };