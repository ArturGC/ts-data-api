import * as h3 from "h3";

import transferPoints from "../handlers/custom/transfer-points";

export const router = h3.createRouter().add(...transferPoints);
