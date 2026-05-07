import { defineField, defineType } from "sanity";

export const visitPage = defineType({
  name: "visitPage",
  title: "Visit Page",
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
      name: "serviceTimes",
      title: "Service Times",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "string",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "time",
              title: "Time",
              type: "string",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2
            })
          ],
          preview: {
            select: {
              title: "day",
              subtitle: "time"
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "mapLink",
      title: "Map Link",
      type: "url",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Visit Page"
      };
    }
  }
});
