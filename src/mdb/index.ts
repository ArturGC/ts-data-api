import { MongoClient } from "mongodb";

export const client = new MongoClient(
  process.env.MDB_URI ?? "mongodb://127.0.0.1:27017",
  {
    appName: "TS Data API",
    compressors: ["zstd"],
    ignoreUndefined: true,
    readPreference: "primaryPreferred",
    writeConcern: { journal: true, w: "majority" },
  }
);
