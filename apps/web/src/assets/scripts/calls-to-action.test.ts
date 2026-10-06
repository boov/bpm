import assert from "node:assert/strict";
import { test } from "node:test";

import { bandFor, calls } from "./calls-to-action.ts";

test("labels match the tone of voice table", () => {
  assert.equal(calls.proposal.label, "Request a management proposal");
  assert.equal(calls.development.label, "Talk to us about a new development");
  assert.equal(calls.residents.label, "Contact your property manager");
  assert.equal(calls["sale-pack"].label, "Order a leasehold sale pack");
  assert.equal(calls.pay.label, "Pay your service charge");
});

test("proposal and development preset the enquiry type", () => {
  assert.equal(calls.proposal.href, "/contact?type=new-management");
  assert.equal(calls.development.href, "/contact?type=new-development");
});

test("leaseholder calls use the residents band", () => {
  assert.equal(bandFor("proposal"), "proposal");
  assert.equal(bandFor("development"), "development");
  assert.equal(bandFor("residents"), "residents");
  assert.equal(bandFor("sale-pack"), "residents");
  assert.equal(bandFor("pay"), "residents");
});
