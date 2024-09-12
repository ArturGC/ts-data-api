import { MongoClient } from "mongodb";
import { envs } from "../envs";

export const client = new MongoClient(envs.MDB_URI, {
  appName: "TS Data API",
  compressors: ["zstd"],
  ignoreUndefined: true,
  readPreference: "primaryPreferred",
  writeConcern: { journal: true, w: "majority" },
});
