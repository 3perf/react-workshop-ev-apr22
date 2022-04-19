import { useCallback, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";

// DO NOT DO THIS: MEMORY ISSUES
// const functionCache = {};

function NoteButtonWrapper({
  id,
  text,
  date,
  filter,
  activeNoteId,
  onNoteActivated,
}) {
  const callback = useCallback(
    () => onNoteActivated(id),
    [id, onNoteActivated]
  );

  /*
   let memoizedFn, memoizedDeps
   useCallback = (fn, deps) => {
    if (deps[0] === memoizedDeps[0] && deps[1] === memoizedDeps[1] && ...) {
      return memoizedFn
    }

    memoizedFn = fn
    memoizedDeps = deps
    return memoizedFn
   }
   */

  return (
    <NoteButton
      key={id}
      isActive={activeNoteId === id}
      onNoteActivated={callback}
      text={text}
      filterText={filter}
      date={date}
    />
  );
}

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  const [filter, setFilter] = useState("");

  return (
    <div className="notes-list" style={{ position: "relative" }}>
      <div className="notes-list__filter">
        <FilterInput
          filter={filter}
          onChange={setFilter}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div className="notes-list__notes">
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!filter) {
              return true;
            }

            return text.toLowerCase().includes(filter.toLowerCase());
          })
          .map(({ id, text, date }) => {
            // functionCache[id] =
            //   functionCache[id] ?? (() => onNoteActivated(id));
            // const callback = functionCache[id];

            return (
              <NoteButtonWrapper
                key={id}
                id={id}
                text={text}
                date={date}
                filter={filter}
                activeNoteId={activeNoteId}
                onNoteActivated={onNoteActivated}
              />
            );
          })}
      </div>

      <div className="notes-list__controls">
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 1 })}
          >
            + Note
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 300 })}
          >
            + Huge
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 100, paragraphs: 1 })}
          >
            + 100
          </Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onDeleteAllRequested()}
          >
            Delete all
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NotesList;
