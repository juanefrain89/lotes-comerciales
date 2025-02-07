import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObserverService {
  private observer: IntersectionObserver | null = null;
  private baseHref: string = '';

  constructor() {}

  // 🔹 Configura el IntersectionObserver
  initObserver(baseHref: string) {
    this.baseHref = baseHref;

    const config = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.01,
    };

    this.observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          // Carga de imágenes
          if (element.tagName === 'IMG' && element.hasAttribute('data-src')) {
            this.loadImage(element as HTMLImageElement);
          }

          // Aplicar animaciones
          if (element.hasAttribute('data-animate')) {
            this.animateElement(element);
          }

          self.unobserve(element); // Dejar de observar el elemento
        }
      });
    }, config);

    this.observeElements();
  }

  // 🔹 Método para cargar imágenes diferidas
  private loadImage(img: HTMLImageElement) {
    let dataSrc: string = img.getAttribute('data-src') || '';

    // Elimina dominio del URL si es necesario
    dataSrc = dataSrc.replace(/^https?:\/\/[^\/]+/, '');

    if (dataSrc.startsWith(this.baseHref)) {
      dataSrc = dataSrc.replace(new RegExp('^' + this.baseHref), '');
    }

    if (dataSrc) {
      img.src = `${this.baseHref}${dataSrc}`;
      img.onload = () => img.classList.add('loaded');
      img.removeAttribute('data-src');
    }
  }

  // 🔹 Método para aplicar animaciones
  private animateElement(element: HTMLElement) {
    const animationClass = element.getAttribute('data-animate') || '';
    element.classList.add('animate__animated', animationClass);
  }

  // 🔹 Observar elementos con `data-src` y `data-animate`
  observeElements() {
    if (this.observer) {
      document
        .querySelectorAll('[data-src]')
        .forEach((img) => this.observer!.observe(img));
      document
        .querySelectorAll('[data-animate]')
        .forEach((el) => this.observer!.observe(el));
    }
  }
}
