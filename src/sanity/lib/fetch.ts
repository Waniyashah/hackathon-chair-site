import { createClient, QueryParams, QueryWithoutParams } from "next-sanity";

const client = createClient({
  projectId: "ryghllbg", 
  dataset: "production", 
  useCdn: true, 
  apiVersion: "2023-01-01", 
});

// Explicit typing for the params argument
export async function sanityfetch({
  query,
  params = {} as QueryParams | QueryWithoutParams,
}: {
  query: string;
  params?: QueryParams | QueryWithoutParams;
}) {
  return await client.fetch(query, params);
}

// ✅ Function for fetching all products (listing page)
export const fetchProducts = async () => {
  const query = `*[_type == "product"]{
    _id,
    name,
    price,
    "imageUrl": image.asset->url
  }`;

  return await sanityfetch({ query });
};

// ✅ Function for fetching a single product by ID (detail page)
export const fetchProductById = async (id: string) => {
  const query = `*[_type == "product" && _id == $id][0]{
    name,
    description,
    price,
    "imageUrl": image.asset->url,
    sizes
  }`;

  return await sanityfetch({ query, params: { id } });
};

// ✅ Function for fetching categories
export const fetchCategories = async () => {
  const query = `*[_type == "categories"] { _id, title }`;
  return await sanityfetch({ query });
};

// ✅ Function for fetching Hero section
export const fetchHeroById = async (id: string) => {
  const query = `*[_type == "Hero" && _id == $id][0]{
    title,
    description,
    "imageUrl": image.asset->url
  }`;

  return await sanityfetch({ query, params: { id } });
};

// ✅ Function for fetching Logo section
export const fetchLogobyId = async (id: string) => {
  const query = `*[_type == "Logos" && _id == $id][0]{
    _id,
    title,
    "image": image.asset->url
  }`;

  return await sanityfetch({ query, params: { id } });
};

// ✅ Function for fetching user order history
export const fetchUserOrderHistory = async (userId: string) => {
  const query = `*[_type == "order" && user._ref == $userId]{
    _id,
    customerName,
    email,
    shippingAddress,
    status,
    totalAmount,
    orderDate,
    items[] {
      productId,
      title,
      quantity,
      price
    }
  }`;

  return await sanityfetch({ query, params: { userId } });
};

// ✅ Function for fetching user's wishlist
export const fetchUserWishlist = async (userId: string) => {
  if (!userId) return []; // Ensure userId exists

  const query = `*[_type == "wishlist" && user._ref == $userId]{
    _id,
    productId,
    title,
    price,
    "imageUrl": imageUrl
  }`;

  return await sanityfetch({ query, params: { userId } });
};
