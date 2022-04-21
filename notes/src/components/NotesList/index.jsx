import _ from "lodash";
import { useMemo, useState, useTransition } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  const [filterInput, setFilterInput] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [isTransitioning, startTransition] = useTransition();

  // const setFilterValueDebounced = useMemo(() => {
  //   const setFilterValueDebounced = _.debounce(setFilterValue, 500);
  //   return setFilterValueDebounced;
  // }, []);

  return (
    <div className="notes-list" style={{ position: "relative" }}>
      <div className="notes-list__filter">
        <FilterInput
          filter={filterInput}
          onChange={(value) => {
            setFilterInput(value);
            startTransition(() => {
              setFilterValue(value);
            });
          }}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div
        className="notes-list__notes"
        style={{ opacity: isTransitioning ? 0.5 : 1 }}
      >
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!filterValue) {
              return true;
            }

            return text.toLowerCase().includes(filterValue.toLowerCase());
          })
          .map(({ id, text, date }) => (
            <NoteButton
              key={id}
              id={id}
              isActive={activeNoteId === id}
              onNoteActivated={onNoteActivated}
              text={text}
              filterText={filterValue}
              date={date}
            />
          ))}
      </div>

      <div className="notes-list__controls">
        {useMemo(
          () => (
            <>
              <ButtonGroup size="small">
                <Button
                  classes={{ root: "notes-list__control" }}
                  onClick={() =>
                    onNewNotesRequested({ count: 1, paragraphs: 1 })
                  }
                >
                  + Note
                </Button>
                <Button
                  classes={{ root: "notes-list__control" }}
                  onClick={() =>
                    onNewNotesRequested({ count: 1, paragraphs: 300 })
                  }
                >
                  + Huge
                </Button>
                <Button
                  classes={{ root: "notes-list__control" }}
                  onClick={() =>
                    onNewNotesRequested({ count: 100, paragraphs: 1 })
                  }
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
            </>
          ),
          [onNewNotesRequested, onDeleteAllRequested]
        )}
      </div>
    </div>
  );
}

export default NotesList;
