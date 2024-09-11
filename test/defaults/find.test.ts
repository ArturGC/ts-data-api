import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/find";

import { requester, withDb } from "../helpers";

withDb(() => {
  describe("Find", () => {
    const users = [{ points: 10 }, { points: 20 }, { points: 30 }];

    test("Should find all documents where points is less than 30", async () => {
      const data = {
        database: "test",
        collection: "users",
        filter: {
          points: { $lt: 30 },
        },
      };

      const collection = client.db(data.database).collection(data.collection);

      await collection.insertMany(users);

      const { body } = await requester({ data, url: endPoint });

      expect(body).toStrictEqual([users[0], users[1]]);
    });
  });
});
