import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Fallback Title",
          type: "string",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "subtitle",
          title: "Fallback Subtitle",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "primaryCta",
          title: "Fallback Primary Button",
          type: "cta",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "secondaryCta",
          title: "Fallback Secondary Button",
          type: "cta"
        }),
        defineField({
          name: "backgroundImage",
          title: "Fallback Background Image",
          type: "imageWithAlt"
        }),
        defineField({
          name: "slides",
          title: "Hero Slides",
          type: "array",
          description: "Images are required. Text and buttons are optional per slide.",
          of: [
            {
              name: "heroSlide",
              title: "Hero Slide",
              type: "object",
              fields: [
                defineField({
                  name: "image",
                  title: "Image",
                  type: "imageWithAlt",
                  validation: (Rule) => Rule.required()
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string"
                }),
                defineField({
                  name: "subtitle",
                  title: "Subtitle",
                  type: "text",
                  rows: 3
                }),
                defineField({
                  name: "primaryCta",
                  title: "Primary Button",
                  type: "cta"
                }),
                defineField({
                  name: "secondaryCta",
                  title: "Secondary Button",
                  type: "cta"
                })
              ],
              preview: {
                select: {
                  title: "title",
                  media: "image"
                },
                prepare({ title, media }) {
                  return {
                    title: title || "Image-only slide",
                    media
                  };
                }
              }
            }
          ],
          validation: (Rule) => Rule.required().min(1)
        })
      ]
    }),
    defineField({
      name: "liveStream",
      title: "Homepage Live Stream",
      type: "videoBlock",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "featuredVideo",
      title: "Homepage Featured Video",
      type: "videoBlock",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "giveCta",
      title: "Giving CTA",
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
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage"
      };
    }
  }
});
