export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items; // массив данных для начальной отрисовки на странице
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // контейнер куда вставлять карточки
  }

  addItem(element) {
    this._container.prepend(element);
  }
  // очищение всех данных в месте вставки
  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach(item => {
    this._renderer(item);
    });
  }
}
