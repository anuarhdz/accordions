class Accordions {
  constructor(element) {
    this.accordionsContainer = element;
    this.accordionsPanels = this.accordionsContainer.querySelectorAll("h2");
  }

  init() {
    return this.accordionsPanels;
  }

  setPanels() {
    this.accordionsPanels.forEach(function(panel){
      panel.firstElementChild.setAttribute("aria-expanded", false);
    });
  }
}

export { Accordions };