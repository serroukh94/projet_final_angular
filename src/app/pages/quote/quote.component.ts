import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService, Car } from '../../services/cars.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quoteForm!: FormGroup;
  allCars: Car[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private carsSvc: CarsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.quoteForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      carModel: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      kmOption: ['standard', Validators.required],
      message: ['']
    });

    // Charger les voitures
    this.carsSvc.getCars().subscribe(cars => {
      this.allCars = cars;
    });
  }

  submitQuote() {
    if (this.quoteForm.invalid) {
      alert('Merci de remplir tous les champs obligatoires correctement.');
      this.quoteForm.markAllAsTouched();
      return;
    }

    // Validation des dates
    const startDate = new Date(this.quoteForm.get('startDate')?.value);
    const endDate = new Date(this.quoteForm.get('endDate')?.value);
    
    if (endDate < startDate) {
      alert('La date de fin doit être postérieure ou égale à la date de début.');
      return;
    }

    // Calculer les détails du devis
    const selectedCar = this.allCars.find(c => c.name === this.quoteForm.get('carModel')?.value);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const kmOption = this.quoteForm.get('kmOption')?.value;
    const kmSupplement = kmOption === 'unlimited' ? 15 : 0; // 15€/jour pour km illimité

    const quoteData = {
      ...this.quoteForm.value,
      carDetails: selectedCar,
      numberOfDays: days,
      basePrice: selectedCar ? days * selectedCar.pricePerDay : 0,
      kmSupplement: days * kmSupplement,
      totalPrice: selectedCar ? (days * selectedCar.pricePerDay) + (days * kmSupplement) : 0
    };

    // Stocker dans sessionStorage et naviguer vers la page de résumé
    sessionStorage.setItem('quoteData', JSON.stringify(quoteData));
    this.router.navigate(['/quote-summary']);
  }
}
