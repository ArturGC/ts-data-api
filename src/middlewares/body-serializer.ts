import * as h3 from "h3";
import { getBodySerializer } from "../utils";

type BodySerializer = h3._ResponseMiddleware<
  h3.EventHandlerRequest,
  h3.EventHandlerResponse<unknown>
>;

export const bodySerializer: BodySerializer = async (event, { body }) => {
  const { serializer } = getBodySerializer(h3.getHeader(event, "content-type"));
  const bodySerialized = serializer(body);

  await h3.send(event, bodySerialized, "application/ejson");
};
