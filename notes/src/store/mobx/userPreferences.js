import { makeAutoObservable, runInAction } from "mobx";
import fakeApi from "../../utils/fakeApi";

class UserPreferencesStore {
  dataState = "not-initialized";
  preferredFont = null;
  preferredColor = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadPreferences() {
    this.dataState = "initialized";

    fakeApi.getPreferredFont().then((preferredFont) => {
      runInAction(() => {
        this.preferredFont = preferredFont;
      });
    });

    fakeApi.getPreferredColor().then((preferredColor) => {
      runInAction(() => {
        this.preferredColor = preferredColor;
      });
    });
  }
}

export default UserPreferencesStore;
