import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import RandomizeSizes from "../RandomizeSizes";
import { memo } from "react";

const ParagraphMemo = memo(function Paragraph({ children }) {
  return <ReactMarkdown remarkPlugins={[gfm]}>{children}</ReactMarkdown>;
});

// useMemo ←→ memo

export default function NoteView({ text }) {
  const paragraphs = text.split("\n\n");

  const markdownParagraphs = paragraphs.map((paragraph, i) => {
    return <ParagraphMemo key={i}>{paragraph}</ParagraphMemo>;
  });

  return (
    <div className="note-view">
      <RandomizeSizes numberOfParagraphs={text.split("\n\n").length} />
      <div className="note-view__text">{markdownParagraphs}</div>
    </div>
  );
}
