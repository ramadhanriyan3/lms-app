import { createRouteHandler } from "uploadthing/next";
import { ourFIleRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFIleRouter,
});
