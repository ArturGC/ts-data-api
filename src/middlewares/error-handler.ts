import { H3Error, type H3Event, setResponseStatus } from "h3";

import { bodySerializer } from "./body-serializer";
import { MongoInvalidArgumentError, MongoServerError } from "mongodb";

type ErrorHandler = (error: H3Error, event: H3Event) => unknown;

const getBodyError = (error: H3Error): unknown => {
  if (error.cause != null) {
    if (error.cause instanceof MongoServerError) {
      return {
        code: error.cause.errorResponse.code,
        errmsg: error.cause.errorResponse.errmsg,
      };
    }

    if (error.cause instanceof MongoInvalidArgumentError) {
      return {
        code: error.cause.code,
        errmsg: error.cause.errmsg,
      };
    }

    return error.cause;
  }

  return { errmsg: error.message };
};

export const errorHandler: ErrorHandler = async (error, event) => {
  setResponseStatus(event, 400);

  return bodySerializer(event, { body: getBodyError(error) });
};
