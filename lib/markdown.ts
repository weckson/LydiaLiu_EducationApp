// 极简 Markdown 渲染器（仅 Phase 1 用，避免额外依赖）
// Phase 2 升级到真正的 markdown 库（如 marked 或 react-markdown）

export function renderMarkdown(md: string): string {
  // 先做 HTML 转义，再做 markdown 替换
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = escaped.split(/\r?\n/);
  const out: string[] = [];
  let inCode = false;
  let inList: "ul" | "ol" | null = null;
  let paraBuf: string[] = [];

  const flushPara = () => {
    if (paraBuf.length > 0) {
      out.push(`<p>${inline(paraBuf.join(" "))}</p>`);
      paraBuf = [];
    }
  };
  const flushList = () => {
    if (inList) {
      out.push(`</${inList}>`);
      inList = null;
    }
  };

  for (const raw of lines) {
    if (raw.startsWith("```")) {
      flushPara();
      flushList();
      if (!inCode) {
        out.push("<pre><code>");
        inCode = true;
      } else {
        out.push("</code></pre>");
        inCode = false;
      }
      continue;
    }
    if (inCode) {
      out.push(raw);
      continue;
    }

    const h = raw.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(raw)) {
      flushPara();
      if (inList !== "ul") {
        flushList();
        out.push("<ul>");
        inList = "ul";
      }
      out.push(`<li>${inline(raw.replace(/^\s*[-*]\s+/, ""))}</li>`);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(raw)) {
      flushPara();
      if (inList !== "ol") {
        flushList();
        out.push("<ol>");
        inList = "ol";
      }
      out.push(`<li>${inline(raw.replace(/^\s*\d+\.\s+/, ""))}</li>`);
      continue;
    }
    if (raw.startsWith("> ")) {
      flushPara();
      flushList();
      out.push(`<blockquote>${inline(raw.slice(2))}</blockquote>`);
      continue;
    }
    if (raw.trim() === "") {
      flushPara();
      flushList();
      continue;
    }
    paraBuf.push(raw);
  }
  flushPara();
  flushList();
  if (inCode) out.push("</code></pre>");

  return out.join("\n");
}

function inline(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-brand-600 underline" target="_blank" rel="noreferrer">$1</a>'
    );
}
