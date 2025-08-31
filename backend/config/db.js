import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		console.warn('MONGODB_URI is not set. Skipping MongoDB connection.');
		return null;
	}
	try {
		const conn = await mongoose.connect(uri, {
			// keep options minimal; Mongoose 8+ uses sensible defaults
		});
		console.log(`MongoDB connected: ${conn.connection.host}`);
		return conn;
	} catch (err) {
		console.error('MongoDB connection error:', err.message);
		process.exitCode = 1;
		throw err;
	}
};

export default connectDB;

