import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfidentialitePageComponent } from './pages/confidentialite-page/confidentialite-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';

const routes: Routes = [
  { path: '', component: FormPageComponent },
  { path: 'confidentialite', component: ConfidentialitePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
