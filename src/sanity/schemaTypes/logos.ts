import { defineType } from "sanity";

export const LogosSchema = defineType({
    name: 'Logos',
    title: 'Logos',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'image',
            title: 'hero Image',
            type: 'image',
        },
        
    ],
});