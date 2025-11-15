import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modèle minimal d'une voiture
export interface Car {
  id: string;
  name: string;             // ex: "Peugeot 308"
  pricePerDay: number;      // ex: 40
  transmission: 'Manuelle' | 'Automatique';
  image?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class CarsService {
  private base = '/api'; // via proxy -> http://localhost:3000

  constructor(private http: HttpClient) {}

  // Toutes les voitures
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.base}/cars`);
  }

  // Une voiture par id
  getCar(id: string | number): Observable<Car> {
    return this.http.get<Car>(`${this.base}/cars/${id}`);
  }
}
