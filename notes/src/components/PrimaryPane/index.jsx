import { Button } from "@mui/material";
import { useState } from "react";
import fakeApi from "../../utils/fakeApi";
import NoteEditor from "../NoteEditor";
import NoteView from "../NoteView";
import DarkModeSwitcher from "../DarkModeSwitcher";
import ActiveAuthors from "../ActiveAuthors";
import spinner from "./spinner.svg";
import "./index.css";
import { unstable_batchedUpdates } from "react-dom";

function PrimaryPane({ activeNoteId, notes, saveNote }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [publishedAt, setPublishedAt] = useState(null);
  const [state4, setState4] = useState(null);

  // render 1: hook 1 changed → line 23

  // render 2: hook 2 changed → line 31
  // render 3: hook 3 changed → line 32
  // render 4: hook 1 changed → line 35

  const togglePublic = async () => {
    setIsLoading(true);
    setState4(Math.random());

    if (isPublic) {
      // → false
      await fakeApi.setPublicStatus(false);
      unstable_batchedUpdates(() => {
        setIsPublic(false);
        setIsLoading(false);
      });
    } else {
      await fakeApi.setPublicStatus(true);
      const publishedDate = await fakeApi.getPublishedDate();
      unstable_batchedUpdates(() => {
        setIsPublic(true);
        setPublishedAt(publishedDate.toLocaleTimeString());
        setIsLoading(false);
      });
      // → weirdly, fairly stable
      // → a noop in React 18 because React 18 does this automatically
      // → this function works anywhere (even in Redux and MobX)
    }
  };

  // → REACT 17 AND BELOW: only state calls inside event handlers
  // (or inside any sync functions that event handlers call) are batched – until the end of the tick
  // This is broken by async/await, setTimeout, Promise.then() because a new tick starts
  // → REACT 18: *all* state calls are batched as long as they happen inside a single tick (a single task)

  const onClick = () => {
    setIsPublic(false);
    setPublishedAt(new Date().toDateString());
    setTimeout(() => {
      setSomething("foo");
      // → rerender the app
      setSomethingElse("foo");
      // → rerender the app
    }, 0);
    // somePromise.then(() => {
    //   setSomethingElse("foo");
    // })
  };
  // → combine all state updates together → rerender the app in one go

  /*
  onClick = () => {
    unstable_batchedUpdates(() => {
      clickEventListener()
    })
  }
  */

  if (!activeNoteId) {
    return (
      <div className="primary-pane__empty-editor">
        <div className="primary-pane__eyes"></div>
        <div className="primary-pane__eyes-caption">
          Select a note to start editing
        </div>
      </div>
    );
  }

  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1 className="primary-pane__header-text">Editor</h1>
        <ActiveAuthors />
        <DarkModeSwitcher />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__controls">
          <Button
            variant="outlined"
            onClick={togglePublic}
            disabled={isLoading}
            startIcon={isPublic ? "🤫" : "👀"}
          >
            {isLoading
              ? "Loading..."
              : isPublic
              ? "Make Private"
              : "Make Public"}
          </Button>
          {!isLoading && isPublic && <span>Published at: {publishedAt}</span>}
        </div>
        <NoteEditor
          saveNote={({ text, date }) => saveNote(activeNoteId, { text, date })}
          notes={notes}
          activeNoteId={activeNoteId}
        />
        <div className="primary-pane__view">
          <NoteView text={notes[activeNoteId].text} />
        </div>
      </div>
      <div
        className={
          "primary-pane__spinner-wrapper" +
          (isLoading ? " primary-pane__spinner-wrapper_visible" : "")
        }
      >
        <img className="primary-pane__spinner" src={spinner} alt="" />
      </div>
    </div>
  );
}

export default PrimaryPane;
