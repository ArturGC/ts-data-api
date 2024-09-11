import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/distinct";

import { requester, withDb } from "../helpers";

withDb(() => {
  describe("Distinct", () => {
    const users = [{ points: 10 }, { points: 20 }, { points: 30 }];

    test("Should get all the distinct values for the field points that is less than 30", async () => {
      const data = {
        database: "test",
        collection: "users",
        key: "points",
        filter: {
          points: { $lt: 30 },
        },
      };

      const collection = client.db(data.database).collection(data.collection);

      await collection.insertMany(users);

      const { body } = await requester({ data, url: endPoint });

      expect(body).toStrictEqual([10, 20]);
    });
  });
});
