import { defineConfig, type DocumentActionComponent } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const singletonTypes = new Set(["siteSettings", "homepage", "watchPage", "givePage", "visitPage"]);

export default defineConfig({
  name: "rccgpa",
  title: "RCCG Peace Assembly",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Site Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem().title("Homepage").id("homepage").child(S.document().schemaType("homepage").documentId("homepage")),
            S.divider(),
            S.documentTypeListItem("post").title("Blog Posts"),
            S.documentTypeListItem("event").title("Events"),
            S.divider(),
            S.listItem().title("Watch Page").id("watchPage").child(S.document().schemaType("watchPage").documentId("watchPage")),
            S.listItem().title("Give Page").id("givePage").child(S.document().schemaType("givePage").documentId("givePage")),
            S.listItem().title("Visit Page").id("visitPage").child(S.document().schemaType("visitPage").documentId("visitPage"))
          ])
    })
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => !singletonTypes.has(template.schemaType)),
    document: {
      actions: (prev: DocumentActionComponent[], context: { schemaType: string }) =>
        singletonTypes.has(context.schemaType)
          ? prev.filter(({ action }) => action && !["delete", "duplicate", "unpublish"].includes(action))
          : prev
    }
  }
});
