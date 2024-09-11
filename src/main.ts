import app from "./app";

(async () => {
  const port = process.env.SERVER_PORT ?? 8080;

  app.listen(port, () =>
    console.log(`TypeScript Data API running on port ${port}`)
  );
})().catch(console.error);
