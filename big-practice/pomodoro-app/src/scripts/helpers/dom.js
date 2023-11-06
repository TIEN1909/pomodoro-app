class Dom {
  constructor() {}

  toggleDisplay = (...elements) => {
    elements.forEach(element => {
      if (element) {
        element.classList.toggle('hidden');
      }
    });
  };
}

export default Dom;
