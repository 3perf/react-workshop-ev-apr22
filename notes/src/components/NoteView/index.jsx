import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function NoteView({ text, userPreferences }) {
  const preferredFont = userPreferences.preferredFont;
  const preferredColor = userPreferences.preferredColor;

  useEffect(() => {
    if (userPreferences.dataState === "not-initialized") {
      userPreferences.loadPreferences();
    }
  }, []);

  return (
    <div
      className="note-view"
      style={{
        fontFamily: preferredFont,
        filter: preferredColor === "dark" ? "invert(1)" : undefined,
      }}
    >
      <ReactMarkdown remarkPlugins={[gfm]}>{text}</ReactMarkdown>
    </div>
  );
}

export default observer(NoteView);
