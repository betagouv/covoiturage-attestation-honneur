import { Observable } from 'rxjs';

export interface SearchInterface {
  search(term: string): Observable<string[]>;
}
