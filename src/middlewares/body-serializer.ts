import { EJSON } from "bson";
import * as h3 from "h3";

type BodySerializer = h3._ResponseMiddleware<
  h3.EventHandlerRequest,
  h3.EventHandlerResponse<unknown>
>;

export const bodySerializer: BodySerializer = async (event, { body }) => {
  const bodySerialized = EJSON.stringify(body);

  await h3.send(event, bodySerialized, "application/ejson");
};
