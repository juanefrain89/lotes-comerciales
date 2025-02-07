import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { registerComponent } from './app/elements/loader';
import Icon from './app/elements/icon.element';

registerComponent(Icon, 'ui-icon');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
