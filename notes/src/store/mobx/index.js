import { makeAutoObservable } from "mobx";
import StatusBarStore from "./statusBar";

class RootStore {
  statusBar = new StatusBarStore();

  constructor() {
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
