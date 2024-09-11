import { EJSON } from "bson";
import request from "supertest";

import app from "../src/app";
import { client } from "../src/mdb";

export async function cleanAllCollections() {
  const collections = await client.db("test").collections();

  return Promise.all(collections.map((c) => c.deleteMany({}).catch((e) => e)));
}

export function withDb(test: () => void): void {
  beforeAll(async () => {
    await client.connect();
  });

  beforeEach(async () => {
    await cleanAllCollections();
  });

  afterAll(async () => {
    await client.close();
  });

  test();
}

type Requester = (args: {
  data?: object;
  url: string;
}) => Promise<request.Response>;

export const requester: Requester = async ({ data, url }) => {
  return request(app)
    ["post"](url)
    .set("content-type", "application/ejson")
    .send(EJSON.stringify(data))
    .buffer(true)
    .parse((res, cb) => {
      let data = Buffer.from("");

      res.on("data", (chunk) => (data = Buffer.concat([data, chunk])));
      res.on("end", () => cb(null, EJSON.parse(data as any)));
    });
};
