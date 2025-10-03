import { JSX } from "react";

export const formatMessageContent = (content: string): React.ReactNode => {
  // Render inline formatting like **bold** and `inline code`
  const renderInline = (text: string): React.ReactNode[] => {
    if (!text) return [text];

    const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return tokens.filter(Boolean).map((tok, i) => {
      // Bold: **text**
      if (tok.startsWith("**") && tok.endsWith("**") && tok.length >= 4) {
        return (
          <strong key={i} className="font-semibold">
            {tok.slice(2, -2)}
          </strong>
        );
      }
      // Inline code: `code`
      if (tok.startsWith("`") && tok.endsWith("`") && tok.length >= 2) {
        return (
          <code
            key={i}
            className="px-1 py-0.5 rounded bg-[#121212] text-[#7CFC00] font-mono text-[0.9em]"
          >
            {tok.slice(1, -1)}
          </code>
        );
      }
      // Plain text
      return <span key={i}>{tok}</span>;
    });
  };

  // Render markdown-like blocks: headings, lists, and paragraphs
  const renderFormattedText = (
    text: string,
    keyPrefix: string,
  ): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];

    let listType: "ol" | "ul" | null = null;
    let listItems: React.ReactNode[] = [];
    let paraLines: string[] = [];

    const flushList = () => {
      if (!listType || listItems.length === 0) return;
      if (listType === "ol") {
        elements.push(
          <ol
            key={`${keyPrefix}-ol-${elements.length}`}
            className="list-decimal ml-6 my-2 space-y-1"
          >
            {listItems}
          </ol>,
        );
      } else {
        elements.push(
          <ul
            key={`${keyPrefix}-ul-${elements.length}`}
            className="list-disc ml-6 my-2 space-y-1"
          >
            {listItems}
          </ul>,
        );
      }
      listType = null;
      listItems = [];
    };

    const flushPara = () => {
      if (paraLines.length === 0) return;
      elements.push(
        <p
          key={`${keyPrefix}-p-${elements.length}`}
          className="my-2 leading-relaxed"
        >
          {renderInline(paraLines.join(" "))}
        </p>,
      );
      paraLines = [];
    };

    const lines = text.split(/\r?\n/);
    lines.forEach((raw, i) => {
      const line = raw;

      // Headings: #, ##, ###, etc.
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        flushPara();
        flushList();
        const level = Math.min(headingMatch[1].length, 6);
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
        elements.push(
          <Tag
            key={`${keyPrefix}-h-${elements.length}`}
            className="font-semibold mt-3 mb-1"
          >
            {renderInline(headingMatch[2])}
          </Tag>,
        );
        return;
      }

      // Ordered list: 1. Item
      if (/^\d+\.\s+/.test(line)) {
        flushPara();
        const itemText = line.replace(/^\d+\.\s+/, "");
        if (listType !== "ol") {
          flushList();
          listType = "ol";
          listItems = [];
        }
        listItems.push(
          <li key={`${keyPrefix}-oli-${listItems.length}`}>
            {renderInline(itemText)}
          </li>,
        );
        return;
      }

      // Unordered list: - Item or * Item or + Item
      if (/^[-*+]\s+/.test(line)) {
        flushPara();
        const itemText = line.replace(/^[-*+]\s+/, "");
        if (listType !== "ul") {
          flushList();
          listType = "ul";
          listItems = [];
        }
        listItems.push(
          <li key={`${keyPrefix}-uli-${listItems.length}`}>
            {renderInline(itemText)}
          </li>,
        );
        return;
      }

      // Blank line ends paragraphs/lists
      if (line.trim() === "") {
        flushPara();
        flushList();
        return;
      }

      // Accumulate paragraph text
      paraLines.push(line.trim());
    });

    // Flush any remaining buffered content
    flushPara();
    flushList();

    return elements;
  };

  // If no code blocks, still render markdown-like formatting
  if (!content.includes("```")) {
    return (
      <div className="whitespace-pre-wrap">
        {renderFormattedText(content, "full")}
      </div>
    );
  }

  const parts: React.ReactNode[] = [];
  // Keep code block handling; format non-code segments with markdown-like renderer
  const segments = content.split(/(```(?:[\w-]+)?\s*[\s\S]*?```)/g);

  segments.forEach((segment, index) => {
    if (segment.startsWith("```") && segment.endsWith("```")) {
      // Extract language if specified
      const langMatch = segment.match(/```([\w-]+)?(?:\s|$)/);
      const language = langMatch && langMatch[1] ? langMatch[1] : "";

      // Extract code content (remove the backticks and language identifier)
      const codeContent = segment
        .replace(/```(?:[\w-]+)?(?:\s|$)/, "")
        .replace(/\s*```$/, "");

      parts.push(
        <div key={index} className="ml-[25px] w-[calc(100%-25px)]">
          <pre className="bg-[#121212] p-3 rounded-md my-2 overflow-x-auto w-full">
            {language && (
              <div className="text-xs text-[#87CEFA] mb-1">{language}</div>
            )}
            <code className="text-[#7CFC00] text-sm font-mono block w-full">
              {codeContent}
            </code>
          </pre>
        </div>,
      );
    } else if (segment.trim()) {
      parts.push(
        <div key={index} className="whitespace-pre-wrap">
          {renderFormattedText(segment, `seg-${index}`)}
        </div>,
      );
    }
  });

  return parts;
};
