import sanitizeHtml from "sanitize-html";

// Цвет: hex, rgb/rgba или именованный - для текста, выделенного цветом в редакторе.
const COLOR = /^(#[0-9a-fA-F]{3,8}|rgba?\([\d.,\s%]+\)|[a-zA-Z]+)$/;

/** Очищает HTML материала (из редактора) от всего, кроме разрешённой разметки. */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "strike",
      "h2", "h3", "ul", "ol", "li", "blockquote", "a", "span", "hr",
      "code", "pre",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["style"],
    },
    allowedStyles: {
      span: { color: [COLOR] },
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
}
