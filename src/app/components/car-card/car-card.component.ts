import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../services/cars.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input() car!: Car;                           // reçoit la voiture à afficher
  @Output() reserve = new EventEmitter<Car>();  // émet un clic "Réserver"

  onReserve() {
    this.reserve.emit(this.car);
  }
}
