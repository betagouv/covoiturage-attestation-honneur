import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './partials/form/form.component';
import { CompanyService } from './services/company.service';
import { AddressService } from './services/address.service';
import { PdfGeneratorService } from './services/generator.service';
import { AutocompleteFormComponent } from './shared/form/autocomplete/autocomplete.component';
import { DarkModeToggleComponent } from './shared/ui/dark-mode-toggle/dark-mode-toggle.component';

@NgModule({
  declarations: [AppComponent, FormComponent, AutocompleteFormComponent, DarkModeToggleComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CompanyService, AddressService, PdfGeneratorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
