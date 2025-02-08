// import { defineType } from "sanity";

// export const OrderSchema = defineType({
//   name: "order",
//   type: "document",
//   title: "Orders",
//   fields: [
//     {
//       name: "user",
//       type: "reference",  // Linking the order to the user
//       to: [{ type: "user" }],
//       title: "User",
//     },
//     {
//       name: "customerName",
//       type: "string",
//       title: "Customer Name",
//     },
//     {
//       name: "email",
//       type: "string",
//       title: "Email",
//     },
//     {
//       name: "shippingAddress",
//       type: "text",
//       title: "Shipping Address",
//     },
//     {
//       name: "status",
//       title: "Order Status",
//       type: "string",
//       options: {
//         list: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
//       },
//     },
//     {
//       name: "items",
//       type: "array",
//       title: "Ordered Items",
//       of: [
//         {
//           type: "object",
//           fields: [
//             { name: "productId", type: "string", title: "Product ID" },
//             { name: "title", type: "string", title: "Title" },
//             { name: "quantity", type: "number", title: "Quantity" },
//             { name: "price", type: "number", title: "Price" },
//           ],
//         },
//       ],
//     },
//     {
//       name: "totalAmount",
//       type: "number",
//       title: "Total Amount",
//     },
//     {
//       name: "orderDate",
//       type: "datetime",
//       title: "Order Date",
//       options: {
//         dateFormat: "YYYY-MM-DD",
//         timeFormat: "HH:mm",
//       },
//     },
//   ],
// });

import { defineType } from "sanity";

export const OrderSchema = defineType({
  name: "order",
  type: "document",
  title: "Orders",
  fields: [
    {
      name: "user",
      type: "reference",
      to: [{ type: "user" }],
      title: "User",
    },
    {
      name: "customerName",
      type: "string",
      title: "Customer Name",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "shippingAddress",
      type: "text",
      title: "Shipping Address",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      },
    },
    {
      name: "items",
      type: "array",
      title: "Ordered Items",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", type: "string", title: "Product ID" },
            { name: "title", type: "string", title: "Title" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price" },
          ],
        },
      ],
    },
    {
      name: "totalAmount",
      type: "number",
      title: "Total Amount",
    },
    {
      name: "orderDate",
      type: "datetime",
      title: "Order Date",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
      },
    },
    {
      name: "trackingId",
      type: "string",
      title: "Tracking ID",
    },
    {
      name: "estimatedDelivery",
      type: "datetime",
      title: "Estimated Delivery",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    },
  ],
});
