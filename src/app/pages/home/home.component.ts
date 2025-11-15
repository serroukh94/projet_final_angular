import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Car, CarsService } from '../../services/cars.service';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  manuals: Car[] = [];
  autos: Car[] = [];
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(private carsSvc: CarsService) {}

  ngOnInit(): void {
    // On charge toutes les voitures et on sépare par type de boîte
    this.carsSvc.getCars()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (list) => {
          this.manuals = list.filter(c => c.transmission === 'Manuelle');
          this.autos   = list.filter(c => c.transmission === 'Automatique');
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  onReserve(car: Car) {
    // Pour l’instant juste une alerte — on branchera plus tard une vraie réservation
    alert(`Réservation (démo) pour : ${car.name}`);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
