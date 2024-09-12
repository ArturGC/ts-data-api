import { EJSON } from "bson";
import request from "supertest";

import app from "../src/app";
import { client } from "../src/mdb";
import { getBodyParser, getBodySerializer } from "../src/utils";

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
  contentType?: "application/json" | "application/ejson";
  data?: object;
  url: string;
}) => Promise<request.Response>;

export const requester: Requester = async (args) => {
  const contentType = args.contentType ?? "application/ejson";
  const { parser } = getBodyParser(contentType);
  const { serializer } = getBodySerializer(contentType);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjYxNzk3NDB9.TVPIeTj444jMifkd3r_T6jIACwnC86OhtsSjSYt7yV0";

  return request(app)
    ["post"](args.url)
    .set("content-type", contentType)
    .set("Authorization", `Bearer ${token}`)
    .send(serializer(args.data))
    .buffer(true)
    .parse((res, cb) => {
      let data = Buffer.from("");

      res.on("data", (chunk) => (data = Buffer.concat([data, chunk])));
      res.on("end", () => cb(null, parser(data as any)));
    });
};
