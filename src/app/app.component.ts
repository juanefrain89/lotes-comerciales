import {
  Component,
  AfterViewInit,
  AfterContentChecked,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ActionControlService } from './services/control.service';
import { ObserverService } from './services/observer.service';
import { PopupComponent } from './core/popup/popup.component';
import { WhatsappFormComponent } from './core/whatsapp-form/whatsapp-form.component';
import { FormComponent } from './core/form/form.component';
import { FolletoModalComponent } from './core/folleto-modal/folleto-modal.component';
import { PromoModalComponent } from './core/promo-modal/promo-modal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PopupComponent,
    WhatsappFormComponent,
    FormComponent,
    FolletoModalComponent,
    PromoModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements AfterViewInit, AfterContentChecked {
  constructor(
    private router: Router,
    private service: ActionControlService,
    private observer: ObserverService
  ) {
    this.router.events.subscribe((event: any) => {
      this.observer.observeElements();
      this.service.enableTracking(event);
    });
  }

  ngAfterViewInit() {
    this.observer.initObserver(this.service.getBaseHref());
    // document.addEventListener('contextmenu', function (e) {
    //   e.preventDefault();
    // });

    // document.addEventListener('keydown', function (e) {
    //   if (e.keyCode === 123) {
    //     e.preventDefault();
    //   }
    // });
  }

  /* Este método asegura que el observador se aplique
  incluso si las imágenes y animaciones
  aparecen dinámicamente */
  ngAfterContentChecked() {
    this.observer.observeElements();
  }
}
