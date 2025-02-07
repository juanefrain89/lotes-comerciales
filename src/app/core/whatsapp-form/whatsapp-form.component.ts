import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import {
  UTMInterface,
  ZohoRequest,
  ZohoService,
} from '../../services/zoho.service';
import { ActionControlService } from '../../services/control.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-whatsapp-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactFormComponent],
  templateUrl: './whatsapp-form.component.html',
  styleUrl: './whatsapp-form.component.scss',
  providers: [FormService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WhatsappFormComponent {
  show: boolean = false;

  constructor(private service: ActionControlService) {
    this.service.action$.subscribe((data) => {
      const { flag, action } = data;
      if (flag && action === 'whatsapp') this.showModal();
    });
  }

  ngAfterViewInit(): void {}

  closeModal() {
    this.show = false;
  }
  showModal() {
    this.show = true;
  }
}
