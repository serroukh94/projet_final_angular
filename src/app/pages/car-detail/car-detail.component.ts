import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarsService, Car } from '../../services/cars.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent {
  car?: Car;
  loading = true;

  constructor(private route: ActivatedRoute, private carsSvc: CarsService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carsSvc.getCar(id).subscribe({
      next: c => { this.car = c; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
