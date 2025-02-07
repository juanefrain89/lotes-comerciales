import {
  Component,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ActionControlService } from '../../services/control.service';
@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThanksComponent implements AfterViewInit {
  config: any = {};

  constructor(private service: ActionControlService) {
    this.service.getConfig((c: any) => (this.config = c));
  }
  ngAfterViewInit(): void {
    document.body.classList.add('thanks');
  }
}
