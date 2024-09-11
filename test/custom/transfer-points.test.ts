import { client } from "../../src/mdb";
import { endPoint } from "../../src/handlers/custom/transfer-points";

import { requester, withDb } from "../helpers";
import { ObjectId } from "mongodb";

withDb(() => {
  describe("Transfer Points", () => {
    test("Should transfer points between users", async () => {
      expect.assertions(3);

      const user0 = { _id: new ObjectId(), points: 100 };
      const user1 = { _id: new ObjectId(), points: 100 };
      const data = {
        points: 50,
        userOriginId: user0._id,
        userDestinyId: user1._id,
      };

      const collection = client.db("test").collection("users");

      await collection.insertMany([user0, user1]);

      const { statusCode } = await requester({ data, url: endPoint });

      expect(statusCode).toBe(200);

      await collection
        .findOne({ _id: user0._id })
        .then((user) => expect(user!.points).toBe(50));

      await collection
        .findOne({ _id: user1._id })
        .then((user) => expect(user!.points).toBe(150));
    });
  });
});
