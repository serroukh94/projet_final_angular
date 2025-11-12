import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  constructor(private http: HttpClient) {}

  booking = {
    fullName: '',
    email: '',
    carModel: '',
    startDate: '',
    endDate: '',
    message: ''
  };

  successMessage = '';

  submitForm() {
    if (!this.booking.fullName || !this.booking.email || !this.booking.carModel || !this.booking.startDate || !this.booking.endDate) {
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }

    this.http.post('http://localhost:3000/bookings', this.booking).subscribe({
      next: () => {
        this.successMessage = '✅ Votre réservation a bien été enregistrée !';
        this.booking = { fullName: '', email: '', carModel: '', startDate: '', endDate: '', message: '' };
      },
      error: () => alert('Erreur : impossible d’enregistrer la réservation.')
    });
  }
}
