import { defineField, defineType } from "sanity";

export const watchPage = defineType({
  name: "watchPage",
  title: "Watch Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "pageIntro",
      title: "Page Intro",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "liveStream",
      title: "Live Stream",
      type: "videoBlock",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "featuredVideo",
      title: "Featured Video",
      type: "videoBlock",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Watch Page"
      };
    }
  }
});
