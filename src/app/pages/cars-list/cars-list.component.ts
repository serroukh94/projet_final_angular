import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarsService, Car } from '../../services/cars.service';
import { CarCardComponent } from '../../components/car-card/car-card.component';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule, CarCardComponent],
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent {
  cars: Car[] = [];
  loading = true;

  constructor(private carsSvc: CarsService, private router: Router) {
    this.carsSvc.getCars().subscribe({
      next: (list) => { this.cars = list; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  onReserve(car: Car) {
    this.router.navigate(['/booking']);
  }
}
