import { defineType } from "sanity";

export const productSchema = defineType({
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      title: "Price without Discount",
      name: "priceWithoutDiscount",
      type: "number",
      description: "This is the original price before discount",
    },
    {
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Badges like 'New' or 'Sale'",
    },
    {
      name: "featured",  // Added featured field
      title: "Featured",
      type: "boolean",  // True or false to mark product as featured
      description: "Mark this product as featured",
    },
    {
      name: "label",
      title: "Label",
      type: "string"
    },
    {
      name: "image",
      type: "image",
      title: "Product Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "inventory",
      title: "Inventory Management",
      type: "number",
    },
    {
      name: 'isFeaturedInAboutPage',
      title: 'Featured on About Page',
      type: 'boolean',
      initialValue: false,  // By default, products are not featured on the About page
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "categories" }],
    },
  ],
});
