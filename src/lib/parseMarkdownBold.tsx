import React from 'react';

/**
 * Splits a string on **bold** markers and returns an array of React nodes
 * with bold segments wrapped in <strong>.
 *
 * Used in both Experience.tsx (JSX) and ResumePDF.tsx (react-pdf Text).
 * The PDF version has its own ParsedText because react-pdf uses its own
 * component primitives, but this utility covers the web render path.
 */
export function parseMarkdownBold(
  text: string,
  boldClassName = 'font-semibold text-text',
): React.ReactNode[] {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={boldClassName}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
