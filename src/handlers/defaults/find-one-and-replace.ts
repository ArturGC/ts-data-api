import * as h3 from "h3";
import { FindOneAndReplaceOptions } from "mongodb";
import { z } from "zod";

import * as M from "../../middlewares";
import { client } from "../../mdb";

const BodySchema = z.object({
  database: z.string(),
  collection: z.string(),
  filter: z.record(z.unknown()),
  replacement: z.record(z.unknown()),
  options: z.record(z.unknown()).optional(),
});

export const method = "post";
export const endPoint = "/defaults/findOneAndReplace";
export const handler = h3.defineEventHandler({
  handler: async (event) => {
    const body = await M.bodyHandler({ event, schema: BodySchema });
    const result = await client
      .db(body.database)
      .collection(body.collection)
      .findOneAndReplace(
        body.filter,
        body.replacement,
        body.options as FindOneAndReplaceOptions
      );

    return result;
  },
});

export default [endPoint, handler, method] as const;
