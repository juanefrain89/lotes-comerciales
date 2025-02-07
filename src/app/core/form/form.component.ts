import {
  AfterContentInit,
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  ZohoRequest,
  ZohoService,
  UTMInterface,
} from '../../services/zoho.service';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//@ts-ignore
import { ActionControlService } from '../../services/control.service';
import { Router } from '@angular/router';
import '../../elements/icon.element';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactFormComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [ZohoService, FormService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormComponent implements AfterViewInit {
  show: boolean = false;

  constructor(private service: ActionControlService) {
    this.service.action$.subscribe((data) => {
      const { flag, action } = data;
      if (flag && action === 'contacto') this.showModal();
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
