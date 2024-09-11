import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/insert-one";

import { requester, withDb } from "../helpers";
import { ObjectId } from "mongodb";

withDb(() => {
  describe("Insert One", () => {
    const user = { points: 10 };

    test("Should insert one document", async () => {
      const data = {
        database: "test",
        collection: "users",
        document: user,
      };
      const collection = client.db(data.database).collection(data.collection);

      const countBefore = await collection.countDocuments({});
      expect(countBefore).toBe(0);

      const { body } = await requester({
        data,
        url: endPoint,
      });

      expect(body.acknowledged).toBe(true);
      expect(body.insertedId).toBeInstanceOf(ObjectId);

      const countAfter = await collection.countDocuments({});
      expect(countAfter).toBe(1);
    });
  });
});
