import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/update-many";

import { requester, withDb } from "../helpers";

withDb(() => {
  describe("Update Many", () => {
    const users = [{ points: 10 }, { points: 20 }, { points: 30 }];

    test("Should update all documents to have points equals 30", async () => {
      const data = {
        database: "test",
        collection: "users",
        filter: {},
        update: {
          $set: { points: 30 },
        },
      };

      const collection = client.db(data.database).collection(data.collection);

      await collection.insertMany(users);

      const { body } = await requester({ data, url: endPoint });

      expect(body.modifiedCount).toBe(2);
      expect(body.matchedCount).toBe(3);
    });
  });
});
