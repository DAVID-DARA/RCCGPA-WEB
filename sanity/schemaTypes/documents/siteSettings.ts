import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text shown in the navbar and mobile menu."
    }),
    defineField({
      name: "colorScheme",
      title: "Site Color Scheme",
      type: "string",
      description: "Choose the shared site palette. Harbor is the warm, welcoming default.",
      options: {
        list: [
          { title: "Harbor — Teal, coral and warm cream", value: "harbor" },
          { title: "Peace Assembly — Red, blue and white", value: "peace" },
          { title: "Garden — Forest green and soft sage", value: "garden" },
          { title: "Sunrise — Terracotta, plum and ivory", value: "sunrise" },
          { title: "Lavender — Soft violet and rose", value: "lavender" }
        ],
        layout: "radio"
      },
      initialValue: "harbor"
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [{ type: "cta" }]
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tagline"
    }
  }
});
