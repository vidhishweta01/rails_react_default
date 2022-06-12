import { makeAutoObservable } from "mobx";

export default class BigRedButtonUI {
  buttonClickCounter: number;

  constructor() {
    this.buttonClickCounter = 0;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  buttonOnClick() {
    this.buttonClickCounter++;
  }
}
