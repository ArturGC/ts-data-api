import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/aggregate";

import { requester, withDb } from "../helpers";

withDb(() => {
  describe("Aggregate", () => {
    const users = [{ points: 10 }, { points: 20 }, { points: 30 }];

    test("Should return the total points in a collection using aggregation pipeline", async () => {
      const data = {
        database: "test",
        collection: "users",
        pipeline: [
          {
            $group: {
              _id: null,
              total: { $sum: "$points" },
            },
          },
        ],
      };

      const collection = client.db(data.database).collection(data.collection);

      await collection.insertMany(users);

      const { body } = await requester({ data, url: endPoint });
      const bodyExpected = [
        { _id: null, total: users.reduce((acc, cur) => acc + cur.points, 0) },
      ];

      expect(body).toStrictEqual(bodyExpected);
    });
  });
});
