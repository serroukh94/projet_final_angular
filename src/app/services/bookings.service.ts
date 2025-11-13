import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id?: number;
  fullName: string;
  email: string;
  carModel: string;
  startDate: string;
  endDate: string;
  message?: string;
  numberOfDays: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private baseUrl = '/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, booking);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }
}
