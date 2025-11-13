import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyEur',
  standalone: true
})
export class CurrencyEurPipe implements PipeTransform {

  transform(value: number | string): string {
    const num = Number(value);
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num);
  }

}
