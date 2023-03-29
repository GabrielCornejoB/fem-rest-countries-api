import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/types/Country';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  code: string | null;
  country: Country = {
    code: "",
    name: "",
    population: 0,
    region: "",
    capital: "",
    flag: "",
    officialName: "",
    subregion: "",
    tld: [],
    currencies: [],
    languages: [],
    borderCountries: []
  };

  constructor(private aRoute: ActivatedRoute, private countriesService: CountriesService) {
    this.code = this.aRoute.snapshot.paramMap.get("code");
  }

  ngOnInit(): void {
    this.getCountryInfo();
  }

  getCountryInfo() {
    if (this.code !== null) {
      this.countriesService.getCountryById(this.code).subscribe({
        next: (d) => {
          let c = d[0];
          this.country.code = c.cca2;
          this.country.name = c.name.common;
          this.country.population = c.population;
          this.country.region = c.region;
          this.country.capital = c.capital[0];
          this.country.flag = c.flags.png;
          this.country.officialName = c.name.official;
          this.country.subregion = c.subregion;
          this.country.tld = c.tld;
          for(let cur in c.currencies) {
            this.country.currencies?.push(c.currencies[cur].name);
          }
          for(let lan in c.languages) {
            this.country.languages?.push(c.languages[lan]);
          }
          if (c.borders) {
            for(let bor of c.borders) {
              this.countriesService.getCountryById(bor).subscribe({
                next: (b) => this.country.borderCountries?.push(b[0].name.common),
                error: (e) => console.log(e)
              });
            }
          } else {
            this.country.borderCountries?.push("n/a");
          }
          
        },
        error: (e) => console.log(e)
      });
    }
  }
}
