import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { SearchFieldComponent } from '../search-field.component';

@Component({
  selector: 'app-search-employer-field',
  templateUrl: './search-employer-field.component.html',
})
export class SearchEmployerFieldComponent
  extends SearchFieldComponent
  implements OnInit {
  constructor(protected service: CompanyService) {
    super();
  }
}
