import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/find-one-and-delete";

import { requester, withDb } from "../helpers";
import { ObjectId } from "mongodb";

withDb(() => {
  describe("Find One And Delete", () => {
    const users = [
      { _id: new ObjectId(), points: 10 },
      { points: 20 },
      { points: 30 },
    ];

    test("Should find one document and delete it", async () => {
      const data = {
        database: "test",
        collection: "users",
        filter: {
          points: 10,
        },
      };

      const collection = client.db(data.database).collection(data.collection);

      await collection.insertMany(users);

      const { body } = await requester({ data, url: endPoint });

      expect(body).toStrictEqual(users[0]);
    });
  });
});
