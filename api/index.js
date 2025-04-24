import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';
import serverless from 'serverless-http';

dotenv.config({ path: './.env' });

let isConnected = false;

const handler = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  const serverlessHandler = serverless(app);
  return serverlessHandler(req, res);
};

export default handler;
