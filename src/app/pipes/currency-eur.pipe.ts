import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyEur'
})
export class CurrencyEurPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
