import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/replace-one";

import { requester, withDb } from "../helpers";
import { ObjectId } from "mongodb";

withDb(() => {
  describe("Replace One", () => {
    const user = { _id: new ObjectId(), points: 10 };

    test("Should replace one document", async () => {
      const data = {
        database: "test",
        collection: "users",
        filter: {
          _id: user._id,
        },
        replacement: {
          points: 40,
        },
      };

      const collection = client.db(data.database).collection(data.collection);

      await collection.insertOne(user);

      const { body } = await requester({ data, url: endPoint });

      expect(body.acknowledged).toBe(true);
      expect(body.modifiedCount).toBe(1);
      expect(body.matchedCount).toBe(1);

      const userNew = await collection.findOne({ _id: user._id });
      expect(userNew).toStrictEqual({ ...user, ...data.replacement });
    });
  });
});
