export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items; // массив данных для начальной отрисовки на странице
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // контейнер куда вставлять карточки
  }

  addItem(element) {
    this._container.prepend(element);
  }
  appendItem(element) {
    this._container.append(element);
  }
  // очищение всех данных в месте вставки
  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    // this.clear(); нужно если в контейнере могут оказаться тестовые данные

    items.forEach(item => {
      this._renderer(item);
    });
  }
}
