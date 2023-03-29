import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from 'src/app/types/Country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  URL: string = "https://restcountries.com/v3.1/";

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any[]> {
    return this.http.get<Country[]>(this.URL + "all");
  }
  getCountryById(id: string): Observable<any> {
    return this.http.get<Country>(this.URL + "alpha/" + id);
  }
}
