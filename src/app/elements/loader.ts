export const registerComponent = (
  element: CustomElementConstructor,
  tag: string
) => {
  if (typeof window === 'undefined') return;
  if (!window.customElements.get(tag)) {
    window.customElements.define(tag, element);
  }
};
