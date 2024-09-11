import * as h3 from "h3";
import { z } from "zod";

import * as M from "../../middlewares";
import { client } from "../../mdb";
import { ObjectIdSchema } from "../../utils";

const BodySchema = z.object({
  points: z.number(),
  userOriginId: ObjectIdSchema,
  userDestinyId: ObjectIdSchema,
});

export const method = "post";
export const endPoint = "/custom/transferPoints";
export const handler = h3.defineEventHandler({
  handler: async (event) => {
    const body = await M.bodyHandler({
      event,
      schema: BodySchema,
    });
    const session = client.startSession();
    const userCollection = client.db("test").collection("users");

    try {
      const decrementPointsResult = await userCollection.updateOne(
        { _id: body.userOriginId, points: { $gt: body.points } },
        { $inc: { points: -body.points } },
        { session }
      );

      if (decrementPointsResult.modifiedCount === 0) {
        throw new Error("User origin does not have enough points");
      }

      const incrementPointsResult = await userCollection.updateOne(
        { _id: body.userDestinyId },
        { $inc: { points: body.points } },
        { session }
      );

      if (incrementPointsResult.modifiedCount === 0) {
        throw new Error("User destiny not found");
      }

      return { message: "transferred" };
    } finally {
      await session.endSession();
    }
  },
});

export default [endPoint, handler, method] as const;
