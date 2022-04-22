import { memo, useLayoutEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { format } from "date-fns";
import "./index.css";

function NoteButton({ isActive, id, onNoteActivated, text, filterText, date }) {
  const noteHeader = useRef();

  // useLayoutEffect(() => {
  //   if (noteHeader.current) {
  //     // uLE × 100
  //     // uLE 1: force the recalculation (because the DOM has just been updated)
  //     // uLE 2: force the recalculation
  //     // uLE 2: force the recalculation
  //     if (noteHeader.current.scrollWidth > noteHeader.current.clientWidth) {
  //       // uLE 1: invalidate the cache
  //       // uLE 2: invalidate the cache
  //       // uLE 2: invalidate the cache
  //       noteHeader.current.classList.add("notes-list__note-header_overflowing");
  //     } else {
  //       noteHeader.current.classList.remove(
  //         "notes-list__note-header_overflowing"
  //       );
  //     }
  //   }
  // }, [text]);

  /*
  for (const i of 0...100) {
    noteHeader.current.scrollWidth
    requestAnimationFrame(() => {
      noteHeader.current.classList.add()
    })
  }
  */

  // useLayoutEffect(() => {
  //   if (noteHeader.current) {
  //     const isOverflowing =
  //       noteHeader.current.scrollWidth > noteHeader.current.clientWidth;
  //     requestAnimationFrame(() => {
  //       if (isOverflowing) {
  //         noteHeader.current.classList.add(
  //           "notes-list__note-header_overflowing"
  //         );
  //       } else {
  //         noteHeader.current.classList.remove(
  //           "notes-list__note-header_overflowing"
  //         );
  //       }
  //     });
  //   }
  // }, [text]);

  const className = [
    "notes-list__button",
    "notes-list__note",
    isActive && "notes-list__note_active",
  ]
    .filter((i) => i !== false)
    .join(" ");

  return (
    <button className={className} onClick={() => onNoteActivated(id)}>
      <span className="notes-list__note-meta">
        {format(date, "d MMM yyyy")}
      </span>
      <span className="notes-list__note-header" ref={noteHeader}>
        {generateNoteHeader(text, filterText)}
      </span>
    </button>
  );
}

function generateNoteHeader(text, filterText) {
  let firstLine = text
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i.length > 0)[0];

  // Wrap the filter text with a `<mark>` tag.
  // (The algorithm below is a bit buggy: if the note itself has any `~~something~~` entries,
  // they will be turned into `<mark>` as well. But this is alright for demo purposes.)
  let componentsMapping = {};
  if (
    filterText &&
    firstLine.toLowerCase().includes(filterText.toLowerCase())
  ) {
    // If `filterText` is `aa`, this splits `bbbbaacccaac` into ['bbb', 'aa', 'ccc', 'aa', 'c']
    // Based on example 2 in https://stackoverflow.com/a/25221523/1192426
    const firstLineParts = firstLine.split(
      new RegExp(
        "(" + filterText.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + ")",
        "gi"
      )
    );

    // This wraps all `filterText` entries with a `del` tag.
    // ['bbb', 'aa', 'ccc', 'aa', 'c'] => ['bbb', '~~aa~~', 'ccc', '~~aa~~', 'c'] => 'bbb~~aa~~ccc~~aa~~c'
    firstLine = firstLineParts
      .map((part) => {
        if (part.toLowerCase() === filterText.toLowerCase()) {
          return `~~${part}~~`;
        }

        return part;
      })
      .join("");

    // This ensures that all `filterText` entries are actually wrapped with `mark`, not with `del`
    componentsMapping = {
      del: "mark",
    };
  }

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      disallowedElements={["p", "h1", "h2", "h3", "h4", "h5", "h6"]}
      unwrapDisallowed={true}
      components={componentsMapping}
    >
      {firstLine}
    </ReactMarkdown>
  );
}

export default memo(NoteButton);
