import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarsService, Car } from '../../services/cars.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit, OnDestroy {
  car?: Car;
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private carsSvc: CarsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }

    this.carsSvc.getCar(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: c => { this.car = c; this.loading = false; },
      error: () => { this.loading = false; }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
