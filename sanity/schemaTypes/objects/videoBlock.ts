import { defineField, defineType } from "sanity";

export const videoBlock = defineType({
  name: "videoBlock",
  title: "Video Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "cta"
    })
  ]
});
