import { ObjectId } from "mongodb";

import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/bulk-write";

import { requester, withDb } from "../helpers";

withDb(() => {
  describe("Bulk Write", () => {
    const user = { _id: new ObjectId(), points: 10 };

    test("Should bulk write operations", async () => {
      const data = {
        database: "test",
        collection: "users",
        operations: [
          {
            insertOne: {
              document: user,
            },
          },
          {
            updateOne: {
              filter: {
                _id: user._id,
              },
              update: {
                $inc: { points: 10 },
              },
            },
          },
        ],
        options: {
          ordered: true,
        },
      };

      const collection = client.db(data.database).collection(data.collection);

      const { body } = await requester({ data, url: endPoint });

      expect(body.insertedCount).toBe(1);
      expect(body.matchedCount).toBe(1);
      expect(body.modifiedCount).toBe(1);

      const userAfter = await collection.findOne({ _id: user._id });

      expect(userAfter!.points).toBe(20);
    });
  });
});
