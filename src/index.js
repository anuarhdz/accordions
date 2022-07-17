class Accordions {
  constructor(element) {
    this.accordionsContainer = element;
    this.accordionControls = Array.from(this.accordionsContainer.querySelectorAll(".accordion-control"));
    this.accordionPanels = this.accordionsContainer.querySelectorAll(".accordion-panel");
    this.currentControlClicked = {};
    this.controlsReady = false;
    this.panelsReady = false;
    this.clickEventHandler = this.clickEvent.bind(this);

    this.init();
  }

  init() {
    this.setControls();
    this.setPanels();
    this.connectComponents();
  }

  setControls() {
    this.accordionControls.forEach(function (panel) {
      panel.setAttribute("aria-expanded", false);
    });
    this.controlsReady = true;
  }
  setPanels() {
    this.accordionPanels.forEach(function (panel) {
      panel.setAttribute("aria-hidden", true);
      panel.setAttribute("role", "region");
    });
    this.panelsReady = true;
  }
  connectComponents() {
    for (let control of this.accordionControls) {
      control.setAttribute("aria-controls", control.parentElement.nextElementSibling.id);
      control.addEventListener("click", this.clickEventHandler);
    }

    for (let panel of this.accordionPanels) {
      panel.setAttribute("aria-labelledby", panel.previousElementSibling.firstElementChild.id);
    }
  }

  clickEvent(e) {
    this.currentControlClicked = {
      control: e.target,
      panel: e.target.parentElement.nextElementSibling,
      status: e.target.getAttribute("aria-expanded") === "true" ? "opened" : "closed",
    };

    if (this.currentControlClicked.status === "closed") {
      this.openPanel(this.currentControlClicked);
    } else if (this.currentControlClicked.status === "opened") {
      this.closePanel(this.currentControlClicked);
    }
  }

  openPanel(component) {
    component.panel.removeAttribute("aria-hidden");
    component.panel.classList.add("growth");
    component.panel.classList.remove("shrink");
    component.control.setAttribute("aria-expanded", true);
    component.status = "opened";
  }

  closePanel(component) {

    component.panel.classList.remove("growth");
    component.panel.classList.add("shrink");
    // this.delay = setTimeout(function () {
    //   component.panel.setAttribute("aria-hidden", true);
    // }, 40);
    component.control.setAttribute("aria-expanded", false);
    component.status = "closed";
    component.panel.setAttribute("aria-hidden", true);
  }
}

export { Accordions };