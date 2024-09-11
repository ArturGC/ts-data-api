import { ObjectId } from "mongodb";
import { z } from "zod";

export const ObjectIdSchema = z
  .custom<ObjectId>((val) => ObjectId.isValid(val as string))
  .transform((val) => new ObjectId(val));
