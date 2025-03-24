import { Client, Databases, Functions, Storage, Users } from "node-appwrite";

const client = new Client();
const getUserServer = () => {
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_USERS_API_KEY || "");
  return client;
};

const getProductServer = () => {
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_PRODUCTS_API_KEY || "");
  return client;
};

const getStorageServer = () => {
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_STORAGE_API_KEY || "");
  return client;
};

const getOrdersServer = () => {
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_ORDERS_API_KEY || "");
  return client;
};

export const getUsersFromServer = () => new Users(getUserServer());

export const getProductsFromServer = () => new Databases(getProductServer());

export const getStorageFromServer = () => new Storage(getStorageServer());

export const getOrdersFromServer = () =>
  new Functions(getOrdersServer()) && new Databases(getOrdersServer());

export const serverAppwriteConfig = {
  databaseId: process.env.APPWRITE_DATABASE_ID,
  storageId: process.env.APPWRITE_STORAGE_ID,
  collections: {
    products: process.env.APPWRITE_PRODUCTS_COLLECTION_ID,
    orders: process.env.APPWRITE_ORDERS_COLLECTION_ID,
    orderItems: process.env.APPWRITE_ORDERITEMS_COLLECTION_ID,
    users: process.env.APPWRITE_USERS_COLLECTION_ID,
    carts: process.env.APPWRITE_CARTS_COLLECTION_ID,
    categories: process.env.APPWRITE_CATEGORIES_COLLECTION_ID,
  },
};

export { ID } from "node-appwrite";
