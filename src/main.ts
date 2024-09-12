import { envs } from "./envs";

import app from "./app";

(async () => {
  app.listen(envs.SERVER_PORT, () =>
    console.log(`TypeScript Data API running on port ${envs.SERVER_PORT}`)
  );
})().catch(console.error);
