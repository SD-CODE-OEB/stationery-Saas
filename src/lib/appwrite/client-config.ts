import { Account, Client, Databases, Functions, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

export const clientAppwriteConfig = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
  collections: {
    products: process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID,
    orders: process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID,
    orderItems: process.env.NEXT_PUBLIC_APPWRITE_ORDERITEMS_COLLECTION_ID,
    users: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
    carts: process.env.NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID,
    categories: process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID,
  },
};
export { ID } from "appwrite";
