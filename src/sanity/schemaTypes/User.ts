import { defineType } from "sanity";

export const userSchema = defineType({
    name: "user",
    title: "User",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string"
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: 'isAdmin',
        type: 'boolean',
        title: 'Is Admin',
        initialValue: false,  // By default users are not admin
      },
      {
        name: "password",
        title: "Password",
        type: "string",
        hidden: false,  
      },
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'email',
      },
    },
});
