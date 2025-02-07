import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ActionControlService } from '../../services/control.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-folleto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactFormComponent],
  templateUrl: './folleto-modal.component.html',
  styleUrl: './folleto-modal.component.scss',
  providers: [FormService],
})
export class FolletoModalComponent implements AfterViewInit {
  show: boolean = false;

  constructor(private service: ActionControlService) {
    this.service.action$.subscribe((data) => {
      const { flag, action } = data;
      if (flag && action === 'brochure') this.showModal();
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
