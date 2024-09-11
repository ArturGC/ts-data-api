import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/insert-many";

import { requester, withDb } from "../helpers";

withDb(() => {
  describe("Insert Many", () => {
    const users = [{ points: 10 }, { points: 20 }, { points: 30 }];

    test("Should insert many documents", async () => {
      const data = {
        database: "test",
        collection: "users",
        documents: users,
      };
      const collection = client.db(data.database).collection(data.collection);

      const countBefore = await collection.countDocuments({});
      expect(countBefore).toBe(0);

      const { body } = await requester({
        data,
        url: endPoint,
      });

      expect(body.acknowledged).toBe(true);
      expect(body.insertedCount).toBe(users.length);

      const countAfter = await collection.countDocuments({});
      expect(countAfter).toBe(users.length);
    });
  });
});
