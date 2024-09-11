import * as h3 from "h3";
import { createServer } from "node:http";

import * as M from "./middlewares";
import { routerCustom, routerDefaults } from "./routes";

const app = h3.createApp({
  onBeforeResponse: M.bodySerializer,
  onError: M.errorHandler,
});

app.use(routerCustom);
app.use(routerDefaults);

export default createServer(h3.toNodeListener(app));
