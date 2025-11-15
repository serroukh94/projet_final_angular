import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarsService, Car } from '../../services/cars.service';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule, CarCardComponent],
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(private carsSvc: CarsService, private router: Router) {}

  ngOnInit(): void {
    this.carsSvc.getCars()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (list) => { this.cars = list; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  onReserve(car: Car) {
    this.router.navigate(['/booking']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
