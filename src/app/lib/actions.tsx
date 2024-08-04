"use server"

import {connectToDB} from "./utils"
import {Category, FavQuote, MyQuote, User} from "./model"
import { CategoryToSave, IQuote } from "@/components/ui/interface";


export const saveCategories = async (categories: CategoryToSave[], username: string) => {
  try {
    console.log("Categoris to save:", categories);
    connectToDB()
    await Category.deleteMany({username:username})
    const cat = await Category.find({username:username});
    console.log("FoundCat-",cat);
    
    for (const category of categories) {
  
        const newCategory = new Category({
          ...category,
          username:username,
        });
        await newCategory.save();
        console.log("cat1:", newCategory);
      
    }
    console.log("result","done saving category")
    return { success: true };
  } catch (error) {
    console.error('Error saving categories:', error);
    throw error;
  }
};


export const clearCatDB = async (username:string) =>{
  try {
    Category.deleteMany({username:username})
    console.log("cleared","done clearing category")
  } catch (error) {
    console.error('Error clearing categories:', error);
    throw error;
  }
}


export const getCategories = async(username: string) : Promise<CategoryToSave[]> => {
  try {
    const categories = await Category.find({username:username});
    console.log("Cats:",categories);
    return categories;
  } catch (error) {
    throw error;
    console.log("erra:",error);
    
  }
}


export const addQuote = async (newQuote: IQuote) => {
  try {
    await connectToDB();
    const quote = new MyQuote({
      id: newQuote.id,
      content: newQuote.content,
      author: newQuote.author,
      authorSlug: newQuote.authorSlug,
      authorId: newQuote.authorSlug,  // If this is intended
      tags: newQuote.tags,
      length: newQuote.length,
      username: newQuote.username,  // Static or dynamically assigned username
      dateModified: newQuote.dateModified,
      dateAdded: newQuote.dateAdded,
    });

    await quote.save();
    console.log("result", "done saving", quote);
  } catch (error) {
    console.error("Error saving quote:", error);  // Improved error log
  }
};

export const getMyQuote = async (username: string): Promise<IQuote[]> => {
   await connectToDB();

  try {
    const quotes = await MyQuote.find({ username }); // Destructuring for username property
    console.log(quotes);
    return quotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error; // Re-throw the error for handling at the calling location
  }
};

export const getFavQuote = async (username: string): Promise<IQuote[]> => {
   await connectToDB();

  try {
    const quotes = await FavQuote.find({ username }); // Destructuring for username property
    console.log("favQuotes:",quotes);
    return quotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error; // Re-throw the error for handling at the calling location
  }
};

export const getMyQuoteById = async ( id: string): Promise<IQuote> => {
  await connectToDB();
 try {
   const quote = await MyQuote.findOne({ id }); // Destructuring for username property
   console.log("quote",quote);
      
   const quoteData = {
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
  };

  console.log("quoteD",quoteData);
   
   return quoteData;
 } catch (error) {
   console.error('Error fetching quotes:', error);
   throw error; // Re-throw the error for handling at the calling location
 }
};

export const getFavQuoteById = async ( id: string): Promise<IQuote> => {
  await connectToDB();
 try {
   const quote = await MyQuote.findOne({ id }); // Destructuring for username property
   console.log("quote",quote);
      
   const quoteData = {
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
  };

  console.log("quoteD",quoteData);
   
   return quoteData;
 } catch (error) {
   console.error('Error fetching quotes:', error);
   throw error; // Re-throw the error for handling at the calling location
 }
};


export const deleteMyQuote = async(id:string): Promise<string> =>{
  await connectToDB();

  try {
   await  MyQuote.findOneAndDelete({id:id})


   return "Quote Deleted"
  } catch (error) {
    console.log(error);
    
    return "Error Ocurred while deleting quote"
  }
} 


export const deleteFavQuote = async(id:string): Promise<string> =>{
  await connectToDB();

  try {
   await  FavQuote.findOneAndDelete({id:id})

   return "Quote Deleted"
  } catch (error) {
    console.log(error);
    
    return "Error Ocurred while deleting quote"
  }
} 

export const addMyQuoteToFavorite = async (newQuote: IQuote) => {
  try {
    await connectToDB();
    const quote = new FavQuote({
      id: newQuote.id,
      content: newQuote.content,
      author: newQuote.author,
      authorSlug: newQuote.authorSlug,
      authorId: newQuote.authorSlug,  // If this is intended
      tags: newQuote.tags,
      length: newQuote.length,
      username: newQuote.username,  // Static or dynamically assigned username
      dateModified: newQuote.dateModified,
      dateAdded: newQuote.dateAdded,
    });


    await quote.save();
    console.log("result", "done saving", quote);
  } catch (error) {
    console.error("Error saving quote:", error);  // Improved error log
  }
};


export const removeMyQuoteFromFavorite = async (id: string) => {
  try {
    await connectToDB();
    FavQuote.deleteOne({id:id})
    console.log("result", "done deleting");
  } catch (error) {
    console.error("Error deleting quote:", error);  // Improved error log
  }
};


export const isFavorite = async (id: String) : Promise<boolean> => {
   try{
    await connectToDB();
       const favQuote = await FavQuote.findOne({id:id})
       if (favQuote) {
        return true
       } else{
        return false
       }
   } catch(error){
      console.log(error);
     return false
   }
}

export const loginUser = async(username:string, password:string) => {
try {
  await connectToDB();
  

  const user = await User.findOne({ username });

  if (!user) {
    return {
      status: 0,
      message: "Username not found"
    }
  }

  const isPasswordValid =  password === user.password
  if (!isPasswordValid) {
    return  {
      status: 0,
      message: "Incorrect password "
    }
  }

  return {
    status:1,
     message: 'Login successful',
     data: user
     };
} catch (error) {
  console.log(error);
  return {
    status: 0,
    message: "Server Error"
  }
}
}


export const RegisterUser = async(
  username:string,
   password:string,
   favoriteColor:string,
  ) => {
  try {
    await connectToDB()
  
  const duplicateUser = await User.findOne({ username });
  console.log(favoriteColor);
  

  if (duplicateUser) {
    console.log("Duplicate",duplicateUser);
    return {
      status: 0,
      message: "Duplicate Username found"
    }
  }

  const user = new User({
    username:username,
    password: password,
    favoriteColor:favoriteColor,
  });

  await user.save();
 
  const newUser = await User.findOne({username});
  console.log("user:",newUser);
  
  return {
    status:1,
     message: 'Registration successful',
     data: newUser
     };

  } catch (error) {
    console.log(error);
    return {
      status: 0,
      message: "Server Error"
    }
  }
}

export const resetPassword = async(username:string,favoriteColor: string, newPassword: string) =>{
  try {
    await connectToDB();
    const user = await User.findOne({ username });
     
      
    if (!user) {
     return {
      status: 0,
      message: 'User not found'
     }
    }


    if (user.favoriteColor != favoriteColor) {
      return {
       status: 0,
       message: 'Favorite Color not Correct'
      }
     }


     await User.updateOne({username:username},{password:newPassword})

    const newUser = await User.findOne({username});
    console.log("user found: ",newUser);
    return {
      status:1,
       message: 'Password Reset successful',
       data: newUser
       };
  } catch (error) {
    console.log(error);
    return {
      status: 0,
      message: "Server Error"
    }
  }
}


export const changePassword = async(username:string, newPassword: string) =>{
  try {
    await connectToDB();

     await User.updateOne({username:username},{password:newPassword})

    const newUser = await User.findOne({username});
    console.log("user found: ",newUser);
    return {
      status:1,
       message: 'Password Reset successful',
       data: newUser
       };
  } catch (error) {
    console.log(error);
    return {
      status: 0,
      message: "Server Error"
    }
  }
}
