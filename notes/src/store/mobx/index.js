import { makeAutoObservable } from "mobx";
import NoteMetadataStore from "./noteMetadata";
import StatusBarStore from "./statusBar";
import UserPreferencesStore from "./userPreferences";

class RootStore {
  statusBar = new StatusBarStore();
  noteMetadata = new NoteMetadataStore();
  userPreferences = new UserPreferencesStore();

  constructor() {
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
