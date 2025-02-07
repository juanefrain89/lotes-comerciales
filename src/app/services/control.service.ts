import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface Config {
  [key: string]: string | number | boolean | null | undefined | any;
}

@Injectable({
  providedIn: 'root',
})
export class ActionControlService {
  // BehaviorSubject con un valor inicial
  private actionSource = new BehaviorSubject<{ flag: boolean; action: string }>(
    { flag: false, action: '' }
  );
  private configSource = new BehaviorSubject<Config>({
    landing: '',
    segment: '',
    prime: '',
    zoho: '',
    channel: '',
    google_conversion_id: '',
  });

  // Observable al que los componentes pueden suscribirse
  action$ = this.actionSource.asObservable();
  config$ = this.configSource.asObservable();

  constructor() {
    this.loadConfig();
  }

  async loadConfig() {
    try {
      const cache: any = sessionStorage.getItem('config') || null;
      if (!cache) throw new Error('Config not loaded cache');

      let config: any = JSON.parse(cache);
      this.setConfig({ ...config });
    } catch (error) {
      const baseUrl = this.getBaseHref();
      const response = await fetch(`${baseUrl}api/config.json`);
      const config = await response.json();
      this.setConfig({ ...config });

      sessionStorage.setItem('config', JSON.stringify(config));
    }
  }

  async zohoPayload(callback: Function) {
    const baseUrl = this.getBaseHref();
    const response = await fetch(`${baseUrl}api/contact.json`);
    const contact = await response.json();
    callback(contact.zoho);
  }

  async loadSchema(callback: Function) {
    const baseUrl = this.getBaseHref();
    const response = await fetch(`${baseUrl}api/schema.json`);
    const contact = await response.json();
    callback(contact.schema);
  }

  // Método para emitir el valor booleano y la acción
  setAction(flag: boolean, action: string) {
    this.actionSource.next({ flag, action });
  }
  setConfig(data: any) {
    this.configSource.next({ ...data });
  }
  redirect(path: string): void {
    if (typeof window !== 'undefined') {
      const { hash, href } = window.location;
      const url = new URL(href);
      if (hash) {
        url.hash = '';
      }
      url.pathname += path;

      setTimeout(() => {
        window.location.href = url.toString();
      }, 2000);
    }
  }

  getBaseHref() {
    let baseHref = document.querySelector('base')?.getAttribute('href') || '/';

    if (baseHref === '/') {
      baseHref = '';
    }

    return baseHref;
  }

  getConfig(callback: Function) {
    return this.config$.subscribe((config) => callback(config));
  }

  enableTracking(event: any) {
    if (event instanceof NavigationEnd) {
      // Notifica a GTM del cambio de página
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'pageview',
        pagePath: event.urlAfterRedirects,
      });

      // Detecta la página de "gracias" y ejecuta acciones específicas
      if (event.urlAfterRedirects === '/gracias') {
        this.trackConversion();
      }
    }
  }

  trackConversion() {
    this.config$.subscribe((config: any) => {
      (window as any)?.dataLayer?.push({
        event: 'conversion',
        conversion_id: config.google_conversion_id, // Cambia esto por el ID de conversión proporcionado
      });
    });
  }
}
