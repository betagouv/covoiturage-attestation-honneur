import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ConfidentialitePageComponent } from './pages/confidentialite-page/confidentialite-page.component';
import { CompanyService } from './services/company.service';
import { AddressService } from './services/address.service';
import { PdfGeneratorService } from './services/generator.service';
import { SearchAddressFieldComponent } from './form-elements/search-address-field/search-address-field.component';
import { SearchEmployerFieldComponent } from './form-elements/search-employer-field/search-employer-field.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent,
    ConfidentialitePageComponent,
    SearchAddressFieldComponent,
    SearchEmployerFieldComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [CompanyService, AddressService, PdfGeneratorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
