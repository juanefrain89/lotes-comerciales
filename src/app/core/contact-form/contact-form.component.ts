import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  UTMInterface,
  ZohoRequest,
  ZohoService,
} from '../../services/zoho.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ActionControlService } from '../../services/control.service';

import { FORM_DATA, FORM_REQUIRED_DATA } from './constants';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContactFormComponent implements OnInit {
   // @Input() hideOnClose: boolean = false
  config: any = {};
  schema: any = {};
  zohoPayload: any = {};
  errorForm: boolean = false;

  data: ZohoRequest = FORM_DATA;

  showCtrl: any = {
    SingleLine: true,
    SingleLine1: true,
    PhoneNumber1_countrycode: true,
    Email: true,
    MultiLine: true,
    legal: true,
  };

  requiredData: string[] = [];

  @Input() titleLess: boolean = false;
  @Input() labelLess: boolean = false;
  @Input() action: string = 'agendar cita';
  @Input() formType: string = 'contact';
  @Input() title: string = 'Agenda una cita';
  @Input() subtitle: string =
    'Llena el formulario para poder brindarte una mejor atención';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private zohoApi: ZohoService,
    private landingApi: FormService,
    private service: ActionControlService
  ) {
    this.service.getConfig((config: any) => (this.config = config));

    this.service.loadSchema(
      (schema: any) => (this.schema = schema)
    );

    this.service.zohoPayload(
      (zohoPayload: any) => (this.zohoPayload = zohoPayload)
    );
  }

  ngOnInit(): void {
    // initialize the default zoho data
    this.data = {
      ...this.data,
      ...this.zohoPayload,
    };

    // enable or disable form element on base form type
    switch (this.formType) {
      case 'whatsapp':
      case 'brochure':
        this.requiredData = [
          ...this.requiredData,
          ...FORM_REQUIRED_DATA.filter((v: string) => v !== 'Email'),
        ];

        this.showCtrl = {
          ...this.showCtrl,
          Email: false,
          MultiLine: false,
        };
        break;
      default:
        this.requiredData = [...this.requiredData, ...FORM_REQUIRED_DATA];
        break;
    }
  }

  showError() {
    this.errorForm = true;
    setTimeout(() => {
      this.errorForm = false;
    }, 5000);
  }

  onClose(): void {
    this.data = {
      ...this.data,
      SingleLine: '',
      SingleLine1: '',
      Email: '',
      PhoneNumber1_countrycode: '',
      MultiLine1: '',
    };

    this.close.emit();
  }

  onSubmit(): void {
    this.submitForm();
    this.submit.emit();
  }

  submitForm(): void {
    const formData: ZohoRequest = this.data;
    const utms: UTMInterface = this.zohoApi.getUTMParams(window.location.href);

    const isValid: boolean = this.zohoApi.validateForm(
      formData,
      this.requiredData
    );

    if (!isValid) {
      this.showError();
      return;
    }

    this.landingApi.save({ ...formData, ...utms, form_type: this.formType });
    this.zohoApi.send(formData, utms, this.formType);

    const visitorinfo = {
      contactnumber: formData.PhoneNumber1_countrycode,
      name: formData.SingleLine,
      email: formData.Email,
    };

    parent.postMessage(
      JSON.stringify({
        type: 'zoho.salesiq.apimessage',
        visitor: visitorinfo,
      }),
      '*'
    );

    this.nextEvent();
  }

  nextEvent(): void {
    let url;

    switch (this.formType) {
      case 'whatsapp':
        const message = encodeURIComponent(
          `Hola mi nombre es ${this.data.SingleLine}, ${this.config.whatsapp_message}`
        );
        url = `https://wa.me/${this.config.wp}?text=${message}`;
        window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
        break;
      case 'brochure':
        url = `${this.config.landing}/assets/documents/brochure.pdf`;
        const anchor = document.createElement('a');
        anchor.setAttribute('href', url);
        anchor.setAttribute('download', `${this.config.brochure_name}.pdf`);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        break;

      default:
        break;
    }

    this.onClose();
    this.service.redirect('gracias');
  }
}
