import mongoose from "mongoose"

export const connectToDB = async () => {
    let connection = null; // Initialize connection as null
  
    try {
      // Ensure connection is not already established
      if (connection) {
        console.log('Database connection already established.');
        return;
      }

      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
  
      connection = await mongoose.connect(
      //  'mongodb://127.0.0.1:27017/mydatabase'
    "mongodb+srv://user:1234@cluster0.xg35z6o.mongodb.net/KwuoteDb"
      );
      console.log('Successfully connected to MongoDB Atlas.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      // Handle connection errors gracefully (e.g., retry logic, exit)
    }
  };
  


  export const connectToDB2 = async () => {
    let connection = null; // Initialize connection as null
  
    try {
      // Ensure connection is not already established
      if (connection) {
        console.log('Database connection already established.');
        return;
      }
  
      connection = await mongoose.connect(
        "mongodb+srv://user:1234@cluster0.xg35z6o.mongodb.net/KwuoteDb"
      );
  
      console.log('Successfully connected to MongoDB database.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      // Handle connection errors gracefully (e.g., retry logic, exit)
    }
  };