import { marked } from "marked";
import { formatISO, parseISO } from "date-fns";

let notes;

const loadNotesFromLocalStorage = () => {
  const parsedNotes = JSON.parse(localStorage.reactWorkshopAppNotes || "{}");

  const transformedNotes = {};
  for (const [id, note] of Object.entries(parsedNotes)) {
    const transformedNote = {
      ...note,
      date: parseISO(note.date),
    };
    transformedNotes[id] = transformedNote;
  }

  return transformedNotes;
};

let queueTimeout;
const saveNotesToLocalStorage = (notes) => {
  // receive notes

  // walk over every note
  // for (const [id, note] of Object.entries(notes)) {
  //   // transform every note (which involves taking the text and converting it to html using marked())
  //   const transformedNote = {
  //     ...note,
  //     date: formatISO(note.date),
  //     html: marked(note.text),
  //   };
  //   transformedNotes[id] = transformedNote;
  // }

  // Step 1: rewrite into the queue pattern (while ... queue.shift())
  // Step 2: take the queue code and move it into a separate function
  // Step 3: transform the function to use isInputPending and setTimeout
  // Step 4 (optional): add the deadline using performance.now()
  clearTimeout(queueTimeout);
  const notesToProcess = Object.entries(notes);
  queueTimeout = processQueue(notesToProcess, (transformedNotes) => {
    // stringify all the notes
    const stringifiedNotes = JSON.stringify(transformedNotes);

    // save into local storage
    localStorage.reactWorkshopAppNotes = stringifiedNotes;
  });

  function processQueue(queue, callback, result = {}) {
    const deadline = performance.now() + 10; /* ms */
    // number of ms that have passed since the page was loaded
    // vs Date.now()

    while (queue.length > 0) {
      if (navigator.scheduling.isInputPending()) {
        break;
      }
      if (performance.now() >= deadline) {
        break;
      }

      const [id, note] = queue.shift();
      // transform every note (which involves taking the text and converting it to html using marked())
      const transformedNote = {
        ...note,
        date: formatISO(note.date),
        html: marked(note.text),
      };
      result[id] = transformedNote;
    }

    if (queue.length === 0) {
      callback(result);
    } else {
      return setTimeout(() => processQueue(queue, callback, result), 0);
    }
  }
};

export const getNotes = () => {
  if (!notes) {
    notes = loadNotesFromLocalStorage();
  }

  return notes;
};

// let idleCallbackId;
export const putNote = (noteId, { text, date }) => {
  if (notes[noteId]) {
    // The note already exists; just update it
    notes = {
      ...notes,
      [noteId]: {
        ...notes[noteId],
        text: text || notes[noteId].text,
        date: date || notes[noteId].date,
      },
    };
  } else {
    // The note doesn’t exist; create it, filling the creation date
    notes = {
      ...notes,
      [noteId]: {
        id: noteId,
        text: text,
        date: date || new Date(),
      },
    };
  }

  // cancelIdleCallback(idleCallbackId);
  // idleCallbackId = requestIdleCallback(() => {
  saveNotesToLocalStorage(notes);
  // });
};

export const deleteNotes = () => {
  notes = {};

  saveNotesToLocalStorage(notes);
};
