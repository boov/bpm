const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export const renderInline = (text: string): string => {
  let html = "";
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    html += escapeHtml(text.slice(last, match.index));
    html += `<a href="${escapeHtml(href)}" class="link">${escapeHtml(label)}</a>`;
    last = match.index + whole.length;
  }
  return html + escapeHtml(text.slice(last));
};

export const stripInline = (text: string): string => text.replace(LINK, "$1");
