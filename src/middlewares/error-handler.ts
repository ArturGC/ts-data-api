import { H3Error, type H3Event, setResponseStatus } from "h3";

import { bodySerializer } from "./body-serializer";
import { MongoServerError } from "mongodb";

type ErrorHandler = (
  error: H3Error | MongoServerError,
  event: H3Event
) => unknown;

export const errorHandler: ErrorHandler = async (error, event) => {
  setResponseStatus(event, 400);

  return bodySerializer(event, { body: error.cause });
};
