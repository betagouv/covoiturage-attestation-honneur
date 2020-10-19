import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  // private apiUrl = 'https://api.covoiturage.beta.gouv.fr';
  private apiUrl = 'http://localhost:8080';
  private allowedOrigins = [
    'http://localhost:4200',
    'https://attestation.covoiturage.beta.gouv.fr',
  ];

  constructor(private http: HttpClient) {}

  async save(origin: string, type: 'public' | 'limited'): Promise<void> {
    if (this.allowedOrigins.indexOf(origin) === -1) {
      return console.log('[honor save] called from forbidden origin', origin);
    }

    this.http
      .post(`${this.apiUrl}/honor`, { type })
      .subscribe(() => {}, console.log);
  }
}
