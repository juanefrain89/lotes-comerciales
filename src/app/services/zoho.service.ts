import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionControlService } from './control.service';

export interface UTMInterface {
  [key: string]: any;
  utm_source: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  utm_medium: string;
}

export type FormType =
  | string
  | 'contacto'
  | 'whatsapp'
  | 'brochure'
  | 'preventa'
  | 'suscripcion';

export interface ZohoRequest {
  [key: string]: any;
  SingleLine: string;
  SingleLine1: string;
  PhoneNumber1_countrycode: string;
  PhoneNumber_countrycode: string;
  Email: string;
  MultiLine: string;
  Dropdown1: string | null;
  Dropdown: string | null;
  Dropdown2: string | null;
  Dropdown3?: string | null;
  Dropdown5?: string | null;
  SingleLine4?: string | null;
  SingleLine5?: string | null;
  SingleLine2?: string | null;
  SingleLine3?: string | null;
  SingleLine6?: string | null;
  SingleLine7?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ZohoService {
  config: any = {};
  constructor(private http: HttpClient, private service: ActionControlService) {
    this.service.getConfig((config: any) => {
      this.config = config;
    });
  }

  public processRequest(
    form: ZohoRequest,
    utms: UTMInterface,
    form_type: FormType
  ) {
    // tipo de contacto realizado
    let label = '';
    if (form_type === 'whatsapp') label = 'Contacto vía WhatsApp';
    if (form_type === 'brochure') label = 'Contacto vía Descarga de Brochure';
    if (form_type === 'preventa') label = 'Contacto vía Evento de Preventa';
    if (form_type === 'suscripcion')
      label = 'Contacto vía Evento de Suscripción';
    if (form_type === 'contacto') label = 'Contacto vía Formulario';

    // mapeo de utms para zoho
    if (utms.utm_source) {
      form.SingleLine3 = utms.utm_source;
    }
    if (utms.utm_campaign) {
      form.SingleLine6 = utms.utm_campaign;
    }
    if (utms.utm_content) {
      form.SingleLine7 = utms.utm_content;
    }

    //envia un mensaje por defecto
    if (!form?.MultiLine?.length) {
      form.MultiLine = `Más información porfavor - ${label}`;
    } else {
      form.MultiLine = `${form.MultiLine} - ${label}`;
    }

    // formatea el numero de celular sin espacios y simbolos
    form.PhoneNumber1_countrycode = form.PhoneNumber1_countrycode.replace(
      /[ \-\(\)\+\e]/g,
      ''
    );

    console.info('Form data for sending Zoho ::', form);
    return form;
  }

  // Método para enviar los datos del formulario a Zoho usando FormData
  public send(
    datosFormulario: ZohoRequest,
    utms: UTMInterface,
    form_type: string
  ): Observable<any> {
    const data: ZohoRequest = this.processRequest(
      datosFormulario,
      utms,
      form_type
    );
    const formData: FormData = new FormData();

    // Agrega los datos del formulario al objeto FormData
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value: any = data[key];
        formData.append(key, value);
      }
    }

    // Realiza la petición POST a Zoho
    return this.http.post(this.config.zoho, formData);
  }

  // Método para extraer parámetros UTM de la URL
  public getUTMParams(url: string): any {
    const parametrosUTM: any = {};
    // Crea un objeto URL para parsear la URL y sus parámetros de consulta
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    // Itera sobre todos los parámetros de consulta
    params.forEach((value, key) => {
      // Verifica si el parámetro es UTM
      if (key.startsWith('utm_')) {
        parametrosUTM[key] = value;
      }
    });

    return parametrosUTM;
  }

  public validateForm(
    templateForm: ZohoRequest,
    camposRequeridos: string[]
  ): boolean {
    for (const campo of camposRequeridos) {
      if (!templateForm[campo] || templateForm[campo].trim() === '') {
        // Si el campo requerido está vacío o solo contiene espacios en blanco, retorna false
        return false;
      }
    }
    // Validación específica para el correo electrónico
    if (
      camposRequeridos.includes('Email') &&
      !this.validEmail(templateForm.Email)
    ) {
      return false;
    }
    // Validación específica para el número de teléfono
    if (
      camposRequeridos.includes('PhoneNumber1_countrycode') &&
      !this.validPhone(templateForm.PhoneNumber1_countrycode)
    ) {
      return false;
    }
    // Si todos los campos requeridos están presentes, retorna true
    return true;
  }

  private validEmail(email: string): boolean {
    // Expresión regular para validar un correo electrónico básico
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);
  }

  private validPhone(phone: string): boolean {
    const soloNumeros = phone.replace(/\D/g, '');
    return soloNumeros.length >= 10;
  }
}
