import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true, // ✅ dit à Angular que ce composant se suffit à lui-même
  imports: [CommonModule, FormsModule], // ✅ ici on importe FormsModule
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
    // vérifie que tous les champs obligatoires sont remplis
    if (!this.booking.fullName || !this.booking.email || !this.booking.carModel || !this.booking.startDate || !this.booking.endDate) {
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }

    // envoi la réservation dans le backend (db.json)
    this.http.post('http://localhost:3000/bookings', this.booking).subscribe({
      next: () => {
        this.successMessage = '✅ Votre réservation a bien été enregistrée !';
        this.booking = { fullName: '', email: '', carModel: '', startDate: '', endDate: '', message: '' };
      },
      error: () => alert('Erreur : impossible d’enregistrer la réservation.')
    });
  }
}
