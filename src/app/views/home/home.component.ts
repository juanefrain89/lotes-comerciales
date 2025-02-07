import { Component } from '@angular/core';
import { ModalGalleryComponent } from '../../core/modal-gallery/modal-gallery.component';
import { ActionControlService } from '../../services/control.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private service: ActionControlService) {}
  openModal(type: string): void {
    switch (type) {
      case 'promo':
        this.service.setAction(true, 'promocion');
        break;
      case 'whatsapp':
        this.service.setAction(true, 'whatsapp');
        break;
      case 'brochure':
        this.service.setAction(true, 'brochure');
        break;
      case 'privacy':
        this.service.setAction(true, 'privacy');
        break;

      default:
        this.service.setAction(true, 'contacto');
        break;
    }
  }
}
