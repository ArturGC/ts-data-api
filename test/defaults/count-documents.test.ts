import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/count-documents";

import { requester, withDb } from "../helpers";

withDb(() => {
  describe("Count Documents", () => {
    const users = [{ points: 10 }, { points: 20 }, { points: 30 }];

    test("Should count documents where points is less than 30", async () => {
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

      expect(body).toBe(2);
    });

    test("Should return an error when a invalid filter is provided to count documents", async () => {
      const data = {
        database: "test",
        collection: "users",
        filter: {
          points: { $lessThan: 30 },
        },
      };

      const collection = client.db(data.database).collection(data.collection);

      await collection.insertMany(users);

      const { body } = await requester({ data, url: endPoint });

      expect(body.code).toBe(2);
      expect(body.errmsg).toContain("unknown operator");
    });
  });
});
