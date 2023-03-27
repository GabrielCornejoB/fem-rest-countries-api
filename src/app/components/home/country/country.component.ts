import { Component, Input } from '@angular/core';
import { Country } from 'src/app/types/Country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.sass']
})
export class CountryComponent {
  @Input() country: Country = {} as Country;
}
