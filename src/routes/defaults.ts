import * as h3 from "h3";

import aggregate from "../handlers/defaults/aggregate";
import bulkWrite from "../handlers/defaults/bulk-write";
import countDocuments from "../handlers/defaults/count-documents";
import deleteMany from "../handlers/defaults/delete-many";
import deleteOne from "../handlers/defaults/delete-one";
import distinct from "../handlers/defaults/distinct";
import find from "../handlers/defaults/find";
import findOne from "../handlers/defaults/find-one";
import findOneAndDelete from "../handlers/defaults/find-one-and-delete";
import findOneAndReplace from "../handlers/defaults/find-one-and-replace";
import findOneAndUpdate from "../handlers/defaults/find-one-and-update";
import insertMany from "../handlers/defaults/insert-many";
import insertOne from "../handlers/defaults/insert-one";
import replaceOne from "../handlers/defaults/replace-one";
import updateMany from "../handlers/defaults/update-many";
import updateOne from "../handlers/defaults/update-one";

export const router = h3
  .createRouter()
  .add(...aggregate)
  .add(...bulkWrite)
  .add(...countDocuments)
  .add(...deleteMany)
  .add(...deleteOne)
  .add(...distinct)
  .add(...find)
  .add(...findOne)
  .add(...findOneAndDelete)
  .add(...findOneAndReplace)
  .add(...findOneAndUpdate)
  .add(...insertMany)
  .add(...insertOne)
  .add(...replaceOne)
  .add(...updateMany)
  .add(...updateOne);
