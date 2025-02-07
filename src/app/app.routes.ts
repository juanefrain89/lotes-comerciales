import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ThanksComponent } from './views/thanks/thanks.component';
import { InicioComponent } from './componets/inicio/inicio.component';


export const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'gracias', component: ThanksComponent },
  { path: '**', redirectTo: '/404' }
];
