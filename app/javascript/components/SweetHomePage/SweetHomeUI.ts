import { makeAutoObservable } from "mobx";

class SweetHomeUI {
  sugarCounter: number;
  isVerySweet: boolean;
  sweetLevel: number;

  constructor() {
    this.sweetLevel = Math.floor(Math.random() * 10);
    this.sugarCounter = 0;
    this.isVerySweet = false;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  incrementSugarCounter() {
    this.sugarCounter++;

    if (this.sugarCounter > this.sweetLevel) {
      this.isVerySweet = true;
    }
  }
}

export default new SweetHomeUI();
