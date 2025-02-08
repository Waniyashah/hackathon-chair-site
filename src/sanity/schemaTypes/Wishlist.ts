import { defineType } from "sanity";

export const WishlistSchema = defineType({
  name: "wishlist",
  type: "document",
  title: "Wishlist Items",
  fields: [
    {
      name: "user",
      type: "reference",
      to: [{ type: "user" }],  // Reference to user who added to wishlist
      title: "User",
    },
    {
      name: "productId",
      type: "string",
      title: "Product ID",
    },
    {
      name: "title",
      type: "string",
      title: "Product Title",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "imageUrl",
      type: "string",
      title: "Image URL",
    }
  ],
});
