import { defineType } from "sanity";

export const HeroSchema = defineType({
    name: 'Hero',
    title: 'Hero',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'hero Title',
            type: 'string',
        },
        {

            name: 'description',
            title: 'description',
            type: 'string',
        },
        {
            name: 'image',
            title: 'hero Image',
            type: 'image',
        },
        
    ],
});