// ui-icon.ts
export default class Icons extends HTMLElement {
  private shadow: ShadowRoot;
  private iconName: string;
  private iconColor: string;
  private iconSize: string;
  private iconStroke: string;
  private iconRotation: string;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.iconName = '';
    this.iconColor = 'black';
    this.iconSize = '24px';
    this.iconStroke = '1.5';
    this.iconRotation = '0deg';
  }

  static get observedAttributes() {
    return ['name', 'color', 'size', 'rotation', 'stroke'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'name':
          this.iconName = newValue;
          this.loadIcon();
          break;
        case 'color':
          this.iconColor = newValue;
          this.updateIconStyle();
          break;
        case 'size':
          this.iconSize = newValue;
          this.updateIconStyle();
          break;
        case 'stroke':
          this.iconStroke = newValue;
          this.updateIconStyle();
          break;
        case 'rotation':
          this.iconRotation = newValue;
          this.updateIconStyle();
          break;
      }
    }
  }

  connectedCallback() {
    this.loadIcon();
  }

  private loadIcon() {
    if (typeof window === 'undefined') return;
    let baseUrl: any = document.querySelector('link[rel="icon-base"]');
    if (!baseUrl) return;

    baseUrl = baseUrl?.getAttribute('href')!;
    const iconUrl = `${baseUrl}/${this.iconName}.svg`;

    fetch(iconUrl)
      .then((response) => response.text())
      .then((svg) => {
        this.shadow.innerHTML = svg;
        this.updateIconStyle();
      })
      .catch((error) => console.error('Error loading icon:', error));
  }

  private updateIconStyle() {
    const svgElement = this.shadow.querySelector('svg');
    if (svgElement) {
      svgElement.setAttribute('color', this.iconColor);
      svgElement.setAttribute('width', this.iconSize);
      svgElement.setAttribute('height', this.iconSize);
      svgElement.setAttribute('stroke-width', this.iconStroke);
      svgElement.style.transform = `rotate(${this.iconRotation})`;

      // Aplica color y stroke-width a todos los elementos internos
      const elements = svgElement.querySelectorAll('*');
      elements.forEach((el) => {
        el.setAttribute('color', this.iconColor);
        el.setAttribute('stroke', this.iconColor);
        el.setAttribute('stroke-width', this.iconStroke);
      });
    }
  }
}
