import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: {
    hotspot: true
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Describe the image for accessibility and SEO."
    })
  ]
});
