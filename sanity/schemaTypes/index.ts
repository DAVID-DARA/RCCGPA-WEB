import { event } from "./documents/event";
import { givePage } from "./documents/givePage";
import { homepage } from "./documents/homepage";
import { post } from "./documents/post";
import { siteSettings } from "./documents/siteSettings";
import { visitPage } from "./documents/visitPage";
import { watchPage } from "./documents/watchPage";
import { cta } from "./objects/cta";
import { imageWithAlt } from "./objects/imageWithAlt";
import { videoBlock } from "./objects/videoBlock";

export const schemaTypes = [
  cta,
  imageWithAlt,
  videoBlock,
  siteSettings,
  homepage,
  post,
  event,
  watchPage,
  givePage,
  visitPage
];
