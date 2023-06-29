export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  setItem(element) {
    this._container.append(element);
  }

  addNewItem(element) {
    this._container.insertAdjacentElement('afterbegin', element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    // this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
