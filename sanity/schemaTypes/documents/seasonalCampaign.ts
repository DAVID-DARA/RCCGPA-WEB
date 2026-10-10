import { defineField, defineType } from "sanity";

const hexColor = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const seasonalCampaign = defineType({
  name: "seasonalCampaign",
  title: "Seasonal Campaign",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal campaign name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "theme",
      title: "Season",
      type: "string",
      options: { list: [{ title: "Christmas", value: "christmas" }, { title: "Easter", value: "easter" }, { title: "Other event", value: "event" }] },
      initialValue: "event",
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "enabled", title: "Enable campaign", type: "boolean", initialValue: false, description: "Only enabled campaigns within their schedule are shown." }),
    defineField({ name: "startsAt", title: "Starts at", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "endsAt", title: "Ends at", type: "datetime", validation: (Rule) => Rule.required().custom((end, context) => {
      const start = (context.document as { startsAt?: string } | undefined)?.startsAt;
      return !end || !start || new Date(end) > new Date(start) || "End date must be after the start date.";
    }) }),
    defineField({ name: "eyebrow", title: "Short label", type: "string", description: "For example: Christmas at Peace Assembly" }),
    defineField({ name: "headline", title: "Campaign headline", type: "string" }),
    defineField({ name: "description", title: "Campaign message", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Campaign hero image", type: "imageWithAlt" }),
    defineField({ name: "cta", title: "Campaign button", type: "cta" }),
    defineField({ name: "announcement", title: "Announcement banner", type: "string", description: "Optional concise notice displayed with the campaign." }),
    defineField({ name: "primaryColor", title: "Campaign accent color", type: "string", description: "Optional hex color, for example #B5122A.", validation: (Rule) => Rule.custom((value) => !value || hexColor.test(value) || "Enter a valid hex color.") }),
    defineField({ name: "secondaryColor", title: "Campaign secondary color", type: "string", description: "Optional hex color, for example #173B68.", validation: (Rule) => Rule.custom((value) => !value || hexColor.test(value) || "Enter a valid hex color.") })
  ],
  preview: { select: { title: "title", subtitle: "theme", media: "heroImage" } }
});
