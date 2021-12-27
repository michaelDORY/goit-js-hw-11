export default class LoadMoreBtn {

  constructor({ selector, hidden = true }) {
    this.button = document.querySelector(selector);

    hidden ? this.hide() : this.show();
  }

  show() {
    this.button.classList.remove("is-hidden");
  }

  hide() {
    this.button.classList.add("is-hidden");
  }
}