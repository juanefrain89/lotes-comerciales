import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ActionControlService } from '../../services/control.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-modal.component.html',
  styleUrl: './promo-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PromoModalComponent implements AfterViewInit {
  show: boolean = false;

  constructor(private service: ActionControlService) {
    this.service.action$.subscribe((data) => {
      const { flag, action } = data;
      if (flag && action === 'promocion') this.showModal();
    });
  }

  ngAfterViewInit(): void {}

  closeModal() {
    this.show = false;
  }
  showModal() {
    this.show = true;
  }

  onSubmit() {
    this.closeModal();
    this.service.setAction(true, 'contacto');
  }
}
