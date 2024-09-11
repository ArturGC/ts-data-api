import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/defaults/find-one";

import { requester, withDb } from "../helpers";
import { ObjectId } from "mongodb";

withDb(() => {
  describe("Find One", () => {
    const user = { _id: new ObjectId(), points: 10 };

    test("Should find one document", async () => {
      const data = {
        database: "test",
        collection: "users",
        filter: {
          points: user.points,
        },
      };

      const collection = client.db(data.database).collection(data.collection);

      await collection.insertOne(user);

      const { body } = await requester({ data, url: endPoint });
      expect(body).toStrictEqual(user);
    });
  });
});
