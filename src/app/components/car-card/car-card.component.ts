import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../services/cars.service';
import { RouterLink } from '@angular/router';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CurrencyEurPipe } from '../../pipes/currency-eur.pipe';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, RouterLink, HighlightDirective, CurrencyEurPipe],
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input() car!: Car;                           // reçoit la voiture à afficher
  @Output() reserve = new EventEmitter<Car>();  // émet un clic "Réserver"

  /**
   * Normalize image path returned from the API.
   * - If the value is empty or falsy, returns the app default placeholder.
   * - If the value looks absolute (starts with http), returns as-is.
   * - Otherwise ensures a relative `assets/...` path (no leading slash) so
   *   the Angular dev server resolves it correctly.
   */
  imageUrl(img?: string): string {
    const fallback = 'assets/images/voiture.webp';
    if (!img) return fallback;
    const trimmed = img.trim();
    if (!trimmed) return fallback;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    // remove any leading slash to make it relative to the app base href
    return trimmed.replace(/^\//, '');
  }
}
