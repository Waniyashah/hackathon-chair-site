import { defineQuery } from "next-sanity";

// Query for all products (product listing page)
export const allProducts = defineQuery(
  `*[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
  }`
);

// Query for single product (product detail page)
export const productById = defineQuery(
  `*[_type == "products" && _id == $id][0]{
    _id,
    title,
    description,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
    sizes,
    availableColors
  }`
);

export const heropage =defineQuery( `*[_type == "Hero"][0] {
  _id,
  title,
  description,
  "image": image.asset->url
}`
)
;

export const logosec = defineQuery(`*[_type == "Logos"][0]{
  _id,
  title,
  "image": image.asset->url
  
  }`)

  export const featuredProductsQuery = `
  *[_type == "products" && featured == true] {
    _id,
    title,
    price,
    "imageUrl": image.asset->url,
    badge,
    tag,
    originalPrice
  }
`;


export const exploreProductsQuery = `
  *[_type == "products" && label == "explore"]{
    _id,
    title,
    price,
    label,
    "imageUrl": image.asset->url
  }
`;

// Query for user order history
export const userOrderHistory = defineQuery(
  `*[_type == "order" && user._ref == $userId]{
    _id,
    customerName,
    email,
    shippingAddress,
    status,
    totalAmount,
    orderDate,
    items[]{
      productId,
      title,
      quantity,
      price
    }
  }`
);

export const WISHLIST_QUERY = `
  *[_type == "wishlist" && user._ref == $userId] {
    _id,
    productId,
    title,
    price,
    imageUrl
  }
`;
