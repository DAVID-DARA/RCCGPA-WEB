import { defineField, defineType } from "sanity";

export const givePage = defineType({
  name: "givePage",
  title: "Give Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "methods",
      title: "Giving Methods",
      type: "array",
      of: [
        {
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
              rows: 3,
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "cta",
              title: "Button",
              type: "cta",
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description"
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Give Page"
      };
    }
  }
});
