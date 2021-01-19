/**
 * Original implementation from Puzzle Massive pm-icon.
 * https://github.com/jkenlooper/puzzle-massive
 */

const tag = "wot-icon";
const iconSvgPath = "icons.svg";

export default class PmIcon extends HTMLElement {
  constructor() {
    super();
    this.iconName = this.textContent || "";
  }
  render() {
    const iconHref = `${iconSvgPath}#${this.iconName}`;
    this.innerHTML = `<svg class="wot-Icon" width="100%" height="100%" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><use xlink:href="${iconHref}"/></svg>`;
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define(tag, PmIcon);
