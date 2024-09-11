import * as h3 from "h3";
import { z } from "zod";

import * as M from "../../middlewares";
import { client } from "../../mdb";
import { AnyBulkWriteOperation } from "mongodb";

const BodySchema = z.object({
  database: z.string(),
  collection: z.string(),
  operations: z.array(z.record(z.unknown())),
  options: z.record(z.unknown()).optional(),
});

export const method = "post";
export const endPoint = "/defaults/bulkWrite";
export const handler = h3.defineEventHandler({
  handler: async (event) => {
    const body = await M.bodyHandler({ event, schema: BodySchema });
    const result = await client
      .db(body.database)
      .collection(body.collection)
      .bulkWrite(body.operations as AnyBulkWriteOperation[], body.options);

    return result;
  },
});

export default [endPoint, handler, method] as const;