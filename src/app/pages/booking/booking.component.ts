import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarsService, Car } from '../../services/cars.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private carsSvc: CarsService,
    private bookingsService: BookingsService
  ) {}

  booking = {
    fullName: '',
    email: '',
    carModel: '',
    startDate: '',
    endDate: '',
    message: ''
  };

  selectedCar: Car | null = null;
  allCars: Car[] = [];
  totalPrice = 0;
  numberOfDays = 0;
  successMessage = '';

  ngOnInit() {
    // Charger toutes les voitures pour le dropdown
    this.carsSvc.getCars().subscribe(cars => {
      this.allCars = cars;
    });

    // Pré-remplir l'email de l'utilisateur connecté
    const user = this.auth.getCurrentUser();
    if (user) {
      this.booking.email = user.email;
      this.booking.fullName = user.fullName;
    }

    // Récupérer l'ID de la voiture depuis les query params
    this.route.queryParams.subscribe(params => {
      const carId = params['carId'];
      if (carId) {
        this.carsSvc.getCar(Number(carId)).subscribe(car => {
          this.selectedCar = car;
          this.booking.carModel = car.name;
        });
      }
    });
  }

  onCarModelChange() {
    // Quand l'utilisateur change la voiture dans le dropdown
    const car = this.allCars.find(c => c.name === this.booking.carModel);
    if (car) {
      this.selectedCar = car;
      this.calculatePrice();
    }
  }

  calculatePrice() {
    console.log('calculatePrice called', {
      startDate: this.booking.startDate,
      endDate: this.booking.endDate,
      selectedCar: this.selectedCar
    });
    
    if (!this.booking.startDate || !this.booking.endDate || !this.selectedCar) {
      this.totalPrice = 0;
      this.numberOfDays = 0;
      return;
    }

    const start = new Date(this.booking.startDate);
    const end = new Date(this.booking.endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      this.totalPrice = 0;
      this.numberOfDays = 0;
      return;
    }

    this.numberOfDays = diffDays;
    this.totalPrice = diffDays * this.selectedCar.pricePerDay;
    console.log('Price calculated:', { numberOfDays: this.numberOfDays, totalPrice: this.totalPrice });
  }

  submitForm() {
    console.log('submitForm called', this.booking);
    
    // Validation : date de fin >= date de début
    if (this.booking.startDate && this.booking.endDate) {
      const start = new Date(this.booking.startDate);
      const end = new Date(this.booking.endDate);
      if (end < start) {
        alert('La date de fin doit être postérieure ou égale à la date de début.');
        return;
      }
    }

    // Vérifie que tous les champs obligatoires sont remplis
    if (!this.booking.fullName || !this.booking.email || !this.booking.carModel || !this.booking.startDate || !this.booking.endDate) {
      console.log('Validation failed:', {
        fullName: this.booking.fullName,
        email: this.booking.email,
        carModel: this.booking.carModel,
        startDate: this.booking.startDate,
        endDate: this.booking.endDate
      });
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }

    // Envoi la réservation dans le backend (db.json)
    const bookingData = {
      ...this.booking,
      numberOfDays: this.numberOfDays,
      totalPrice: this.totalPrice
    };
    
    this.bookingsService.createBooking(bookingData).subscribe({
      next: () => {
        this.successMessage = '✅ Votre réservation a bien été enregistrée !';
        this.booking = { fullName: '', email: '', carModel: '', startDate: '', endDate: '', message: '' };
        this.totalPrice = 0;
        this.numberOfDays = 0;
      },
      error: () => alert('Erreur : impossible d\'enregistrer la réservation.')
    });
  }
}
