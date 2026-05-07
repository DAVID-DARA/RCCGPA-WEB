import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button Label",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "href",
      title: "Button Link",
      type: "string",
      description: "Use a site path like /watch or a full URL.",
      validation: (Rule) => Rule.required()
    })
  ]
});
