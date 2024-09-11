import { EJSON } from "bson";
import * as h3 from "h3";
import { type z } from "zod";

export const Errors = {
  noBody: () => {
    return h3.createError({
      message: "Body not provided",
      status: 400,
    });
  },
  wrongBody: (zodError: z.ZodError) => {
    return h3.createError({
      cause: zodError.toString(),
      message: "Body expected not provided",
      status: 400,
    });
  },
};

type BodyHandler = <T>(args: {
  event: h3.H3Event;
  schema: z.Schema<T>;
}) => Promise<z.infer<typeof args.schema> | never>;

export const bodyHandler: BodyHandler = async ({ event, schema }) => {
  const rawBody = await h3.readRawBody(event, "utf-8");

  if (rawBody == null) throw Errors.noBody();

  const body = EJSON.parse(rawBody);
  const result = schema.safeParse(body);

  if (result.success) return result.data;

  throw Errors.wrongBody(result.error);
};
