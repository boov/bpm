import assert from "node:assert/strict";
import { test } from "node:test";

import { toJsonLd } from "./json-ld.ts";

test("escapes < so text cannot close the script element", () => {
  const output = toJsonLd({ text: "</script><b>" });
  assert.ok(!output.includes("<"));
  assert.deepEqual(JSON.parse(output), { text: "</script><b>" });
});
