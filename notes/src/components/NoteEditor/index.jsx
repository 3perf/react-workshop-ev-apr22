import { useLayoutEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import "./index.css";

function NoteEditor({ notes, activeNoteId, saveNote }) {
  const currentNote = notes[activeNoteId];
  const textareaRef = useRef();
  const [codeEditorHeight, setCodeEditorHeight] = useState(0);

  useLayoutEffect(() => {
    const currentEditorHeight = textareaRef.current.clientHeight;
    console.log({ currentEditorHeight });
    if (codeEditorHeight !== currentEditorHeight) {
      setCodeEditorHeight(currentEditorHeight);
    }
  });

  return (
    <div className="note-editor" key={activeNoteId}>
      <ContentEditable
        className="note-editor__contenteditable"
        innerRef={textareaRef}
        html={currentNote.text}
        onChange={(e) => saveNote({ text: e.target.value })}
      />
      <div className="note-editor__hint" style={{ top: codeEditorHeight }}>
        Total length: {currentNote.text.length}
      </div>
    </div>
  );
}

export default NoteEditor;
