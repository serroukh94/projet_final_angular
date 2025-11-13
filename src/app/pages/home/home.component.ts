import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car, CarsService } from '../../services/cars.service';
import { CarCardComponent } from '../../components/car-card/car-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  manuals: Car[] = [];
  autos: Car[] = [];
  loading = true;

  constructor(private carsSvc: CarsService) {
    // On charge toutes les voitures et on sépare par type de boîte
    this.carsSvc.getCars().subscribe({
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
}
