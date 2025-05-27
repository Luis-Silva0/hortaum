import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** 
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // increase timeout
      socketTimeoutMS: 45000,          // optional
      ssl: true,
    }).then((mongoose) => {
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      throw new Error('Failed to connect to MongoDB');
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;