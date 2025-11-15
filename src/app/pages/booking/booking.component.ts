import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarsService, Car } from '../../services/cars.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  selectedCar: Car | null = null;
  allCars: Car[] = [];
  totalPrice = 0;
  numberOfDays = 0;
  successMessage = '';
  private readonly dayInMs = 1000 * 60 * 60 * 24;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private carsSvc: CarsService,
    private bookingsService: BookingsService
  ) {}

  ngOnInit() {
    // Créer le FormGroup avec validation
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      carModel: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      message: ['']
    });

    // Charger toutes les voitures pour le dropdown
    this.carsSvc.getCars().subscribe(cars => {
      this.allCars = cars;
    });

    // Pré-remplir l'email de l'utilisateur connecté
    const user = this.auth.getCurrentUser();
    if (user) {
      this.bookingForm.patchValue({
        email: user.email,
        fullName: user.fullName
      });
    }

    // Récupérer l'ID de la voiture depuis les query params
    this.route.queryParams.subscribe(params => {
      const carId = params['carId'];
      if (carId) {
        this.carsSvc.getCar(String(carId)).subscribe(car => {
          this.selectedCar = car;
          this.bookingForm.patchValue({ carModel: car.name });
          this.calculatePrice();
        });
      }
    });

    // Écouter les changements de dates pour recalculer le prix
    this.bookingForm.get('startDate')?.valueChanges.subscribe(() => this.calculatePrice());
    this.bookingForm.get('endDate')?.valueChanges.subscribe(() => this.calculatePrice());
  }

  onCarModelChange() {
    const carModel = this.bookingForm.get('carModel')?.value;
    const car = this.allCars.find(c => c.name === carModel);
    if (car) {
      this.selectedCar = car;
      this.calculatePrice();
    }
  }

  calculatePrice() {
    const startDate = this.bookingForm.get('startDate')?.value;
    const endDate = this.bookingForm.get('endDate')?.value;
    
    if (!startDate || !endDate || !this.selectedCar) {
      this.totalPrice = 0;
      this.numberOfDays = 0;
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();

    if (diffTime < 0) {
      this.totalPrice = 0;
      this.numberOfDays = 0;
      return;
    }

    const rawDays = Math.ceil(diffTime / this.dayInMs);
    this.numberOfDays = Math.max(rawDays, 1);
    this.totalPrice = this.numberOfDays * this.selectedCar.pricePerDay;
  }

  submitForm() {
    // Validation : date de fin >= date de début
    const startDate = this.bookingForm.get('startDate')?.value;
    const endDate = this.bookingForm.get('endDate')?.value;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        alert('La date de fin doit être postérieure ou égale à la date de début.');
        return;
      }
    }

    // Vérifie la validité du formulaire
    if (this.bookingForm.invalid) {
      alert('Merci de remplir tous les champs obligatoires correctement.');
      this.bookingForm.markAllAsTouched();
      return;
    }

    // Envoi la réservation dans le backend
    if (!this.selectedCar) {
      alert('Merci de sélectionner un modèle de voiture.');
      return;
    }

    if (this.numberOfDays <= 0) {
      alert('La durée de location doit être d\'au moins un jour.');
      return;
    }

    const bookingData = {
      ...this.bookingForm.value,
      numberOfDays: this.numberOfDays,
      totalPrice: this.totalPrice
    };
    
    this.bookingsService.createBooking(bookingData).subscribe({
      next: () => {
        this.successMessage = '✅ Votre réservation a bien été enregistrée !';
        this.bookingForm.reset();
        this.totalPrice = 0;
        this.numberOfDays = 0;
        this.selectedCar = null;
      },
      error: () => alert('Erreur : impossible d\'enregistrer la réservation.')
    });
  }
}
