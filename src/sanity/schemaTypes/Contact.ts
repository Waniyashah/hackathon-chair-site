import { defineType } from "sanity";

export const contactSchema = defineType({
  name: "contact",
  title: "contact",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "subject",
      title: "Subject",
      type: "string",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
        ],
      },
    );