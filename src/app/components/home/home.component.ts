import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/types/Country';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  countries: Country[] = [];
  _filterText: string = "";
  filteredCountries: Country[] = [];
  _selectedRegion: string = "";
  activeDropDown: boolean = false;

  constructor(private countriesServices: CountriesService) {}

  get filterText() {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.filteredCountries = this.filterCountries(value);
  }

  get selectedRegion() {
    return this._selectedRegion;
  }
  set selectedRegion(value: string) {
    this._selectedRegion = value;
    this.filteredCountries = this.filterByRegion(value);
  }

  ngOnInit(): void {
    this.getCountries();
    this.filteredCountries = this.countries;
  }

  selectRegion(region: string) {
    this.selectedRegion = region;
    this.activeDropDown = false;
    this.filterByRegion(region);
  }

  filterByRegion(region: string) {
    if (this.countries.length == 0 || region == '') {
      return this.countries;
    }
    else {
      return this.countries.filter((country) => {
        return country.region.toLowerCase() == region.toLowerCase();
      });
    }
  }

  filterCountries(filter: string) {
    if (this.countries.length == 0 || filter == '') {
      return this.countries;
    }
    else {
      return this.countries.filter((country) => {
        return country.name.toLowerCase().startsWith(filter.toLowerCase());
      });
    }
  }

  getCountries(): void {
    this.countriesServices.getCountries().subscribe({
      next: (d) => {
        console.log(d);
        for(let country of d) {
          try {
            this.countries.push({
              name: country.name.common,
              population: country.population,
              region: country.region,
              capital: country.capital[0],
              flag: country.flags.png
            });
          } catch (error) {
            console.log(country);
          }             
        }
      },
      error: (e) => console.log(e)
    });
    console.log(this.countries);
  }
}
