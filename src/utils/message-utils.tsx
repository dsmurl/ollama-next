export const formatMessageContent = (content: string): React.ReactNode => {
  if (!content.includes("```")) {
    return content;
  }

  const parts: React.ReactNode[] = [];
  const segments = content.split(/(```(?:[\w-]+)?\n[\s\S]*?\n```)/g);

  segments.forEach((segment, index) => {
    if (segment.startsWith("```") && segment.endsWith("```")) {
      // Extract language if specified
      const langMatch = segment.match(/```([\w-]+)?\n/);
      const language = langMatch && langMatch[1] ? langMatch[1] : "";

      // Extract code content (remove the backticks and language identifier)
      const codeContent = segment
        .replace(/```(?:[\w-]+)?\n/, "")
        .replace(/\n```$/, "");

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
      parts.push(<span key={index}>{segment}</span>);
    }
  });

  return parts;
};
