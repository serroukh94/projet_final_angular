import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quote-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.css']
})
export class QuoteSummaryComponent implements OnInit {
  quoteData: any = null;
  referenceNumber: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const data = sessionStorage.getItem('quoteData');
    if (data) {
      this.quoteData = JSON.parse(data);
      // Générer un numéro de référence unique
      this.referenceNumber = `#${this.quoteData.email.substring(0, 8).toUpperCase()}-${Date.now() % 10000}`;
    } else {
      // Rediriger vers la page de devis si pas de données
      this.router.navigate(['/quote']);
    }
  }

  printQuote() {
    window.print();
  }
}
