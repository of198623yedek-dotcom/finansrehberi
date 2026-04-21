'use client';

/**
 * Lightweight Markdown renderer for AI advisor chat bubbles.
 * Supports: **bold**, *italic*, headings (##, ###), bullet lists, numbered lists,
 * inline code, code blocks, and emoji preservation.
 * No external dependencies.
 */
export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={elements.length}
          className="my-2 overflow-x-auto rounded-lg bg-slate-950/60 border border-slate-700/50 p-3 text-xs leading-relaxed"
        >
          <code className="text-emerald-400">{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Heading ###
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={elements.length} className="mt-3 mb-1 text-sm font-bold text-indigo-300">
          {renderInline(line.slice(4))}
        </h4>
      );
      i++;
      continue;
    }

    // Heading ##
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={elements.length} className="mt-3 mb-1 text-sm font-bold text-white">
          {renderInline(line.slice(3))}
        </h3>
      );
      i++;
      continue;
    }

    // Bullet list
    if (/^[\-\*•]\s/.test(line.trim())) {
      const listItems = [];
      while (i < lines.length && /^[\-\*•]\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[\-\*•]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={elements.length} className="my-1.5 ml-3 space-y-0.5">
          {listItems.map((item, j) => (
            <li key={j} className="flex gap-1.5 text-sm leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/70" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+[\.\)]\s/.test(line.trim())) {
      const listItems = [];
      while (i < lines.length && /^\d+[\.\)]\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+[\.\)]\s/, ''));
        i++;
      }
      elements.push(
        <ol key={elements.length} className="my-1.5 ml-3 space-y-0.5">
          {listItems.map((item, j) => (
            <li key={j} className="flex gap-1.5 text-sm leading-relaxed">
              <span className="mt-0.5 shrink-0 text-xs font-bold text-indigo-400">{j + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={elements.length} className="h-1.5" />);
      i++;
      continue;
    }

    // Summary/highlight block (📌)
    if (line.trim().startsWith('📌')) {
      elements.push(
        <div
          key={elements.length}
          className="mt-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm"
        >
          {renderInline(line.trim())}
        </div>
      );
      i++;
      continue;
    }

    // Warning block (⚠️)
    if (line.trim().startsWith('⚠️') || line.trim().startsWith('⚠')) {
      elements.push(
        <div
          key={elements.length}
          className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200"
        >
          {renderInline(line.trim())}
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={elements.length} className="text-sm leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
}

/** Render inline markdown: **bold**, *italic*, `code` */
function renderInline(text) {
  if (!text) return text;

  const parts = [];
  // Regex: **bold**, *italic*, `code`
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // **bold**
      parts.push(
        <strong key={parts.length} className="font-semibold text-white">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // *italic*
      parts.push(
        <em key={parts.length} className="italic text-slate-300">
          {match[4]}
        </em>
      );
    } else if (match[5]) {
      // `code`
      parts.push(
        <code
          key={parts.length}
          className="rounded bg-slate-700/60 px-1.5 py-0.5 text-xs font-mono text-emerald-400"
        >
          {match[6]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
