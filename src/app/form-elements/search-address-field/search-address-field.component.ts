import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { SearchFieldComponent } from '../search-field.component';

@Component({
  selector: 'app-search-address-field',
  templateUrl: './search-address-field.component.html',
})
export class SearchAddressFieldComponent
  extends SearchFieldComponent
  implements OnInit {
  constructor(protected service: AddressService) {
    super();
  }
}
