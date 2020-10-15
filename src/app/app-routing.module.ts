import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPublicComponent } from './pages/form-public/form-public.component';
import { FormLimitedComponent } from './pages/form-limited/form-limited.component';
import { FormEmployerComponent } from './pages/form-employer/form-employer.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'salarie-secteur-prive' },
  { path: 'salarie-secteur-public', component: FormPublicComponent },
  { path: 'salarie-secteur-prive', component: FormLimitedComponent },
  { path: 'je-suis-employeur', component: FormEmployerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
