import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { loadUserPreferences } from "../../store/redux/userPreferences";

function NoteView({ text }) {
  const preferredFont = useSelector(
    (state) => state.userPreferences.preferredFont
  );
  const preferredColor = useSelector(
    (state) => state.userPreferences.preferredColor
  );
  const dataState = useSelector((state) => state.userPreferences.dataState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataState === "not-initialized") {
      dispatch(loadUserPreferences());
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

export default NoteView;
