import assert from "node:assert/strict";
import { test } from "node:test";

import { enquiryTypes, needsPropertyAddress, presetEnquiryType } from "./enquiry-types.ts";

test("lists the 10 enquiry types in order", () => {
  assert.deepEqual(
    enquiryTypes.map(type => type.value),
    ["new-management", "new-development", "service-charge", "repairs", "leasehold-sale-pack", "fire-safety", "section-20", "company-secretarial", "complaint", "general"]
  );
});

test("presets a known type from the query string", () => {
  assert.equal(presetEnquiryType("?type=new-management"), "new-management");
  assert.equal(presetEnquiryType("?utm_source=x&type=new-development"), "new-development");
});

test("ignores a missing or unknown type", () => {
  assert.equal(presetEnquiryType(""), "");
  assert.equal(presetEnquiryType("?type=site-visit"), "");
  assert.equal(presetEnquiryType("?type="), "");
});

test("property address is needed except for no type, new development and general", () => {
  assert.equal(needsPropertyAddress(""), false);
  assert.equal(needsPropertyAddress("new-development"), false);
  assert.equal(needsPropertyAddress("general"), false);
  assert.equal(needsPropertyAddress("repairs"), true);
  assert.equal(needsPropertyAddress("new-management"), true);
});
