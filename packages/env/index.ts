import { config } from "dotenv";
config(); 

export const ENVS = {
  PORT: process.env.PORT || "5050",

  SESSION_TOKEN_KEY: process.env.SESSION_TOKEN_KEY || "",
  NEXT_APP_URI: process.env.NEXT_APP_URI || "",

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",

  TRPC_SERVER_API_URI: process.env.TRPC_SERVER_API_URI || "",
};
