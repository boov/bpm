import assert from "node:assert/strict";
import { test } from "node:test";

import { renderInline, stripInline } from "./inline-markdown.ts";

test("escapes plain text", () => {
  assert.equal(renderInline('Fees & charges <£250> "quoted" it\'s'), "Fees &amp; charges &lt;£250&gt; &quot;quoted&quot; it&#39;s");
});

test("renders a link and keeps its query string", () => {
  assert.equal(
    renderInline("To find out, [request a management proposal](/contact?type=new-management)."),
    'To find out, <a href="/contact?type=new-management" class="link">request a management proposal</a>.'
  );
});

test("renders several links in one string", () => {
  assert.equal(renderInline("[A](/a) and [B](/b)"), '<a href="/a" class="link">A</a> and <a href="/b" class="link">B</a>');
});

test("leaves square brackets that are not links as text", () => {
  assert.equal(renderInline("Read [this] (later)"), "Read [this] (later)");
});

test("stripInline keeps the label only", () => {
  assert.equal(stripInline("Read how [Section 20 consultation](/services/section-20-consultation) works."), "Read how Section 20 consultation works.");
});
