import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  endpoint: string = 'https://entreprise.data.gouv.fr/api/sirene/v1/suggest/';

  constructor(private http: HttpClient) {}

  search(term: string): Observable<string[]> {
    if (!term.trim()) return of([]);

    const name = encodeURIComponent(term.trim());

    return this.http
      .get<{ suggestions: string[] }>(`${this.endpoint}${name}`)
      .pipe(
        map((res) => res.suggestions),
        catchError((err) => {
          console.log(err);
          return of([]);
        })
      );
  }
}
