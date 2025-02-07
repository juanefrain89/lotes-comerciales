import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActionControlService } from '../../services/control.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [CommonModule],
})
export class PopupComponent implements AfterViewInit {
  show: boolean = false;

  @ViewChild('closePop', { static: false })
  closeButton!: ElementRef<HTMLButtonElement>;

  constructor(private service: ActionControlService) {
    this.service.action$.subscribe((data) => {
      const { flag, action } = data;
      if (flag && action === 'privacy') this.showModal();
    });
  }

  ngAfterViewInit(): void {
    if (this.closeButton) {
      this.closeButton.nativeElement.addEventListener('click', () =>
        this.hideModal()
      );
    }

    // 🔹 Simula la apertura del modal después de 2s (puedes cambiar esto)
    setTimeout(() => {
      this.showModal();
    }, 2000);
  }

  showModal(): void {
    this.show = true;
  }
  hideModal(): void {
    this.show = false;
  }
}
