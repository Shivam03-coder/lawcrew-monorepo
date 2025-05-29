import { config } from "dotenv";
config();

export const appEnvConfigs = {
  PORT: process.env.PORT,
  NEXT_APP_URI: process.env.NEXT_APP_URI,
  SESSION_TOKEN_KEY: process.env.SESSION_TOKEN_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_SECRET_KEY: process.env.STREAM_SECRET_KEY,
};
