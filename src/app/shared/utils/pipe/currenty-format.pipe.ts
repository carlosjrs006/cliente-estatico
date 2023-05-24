import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentyFormat'
})
export class CurrentyFormatPipe implements PipeTransform {

  transform(value: number): string {
    return formatCurrency(value, 'pt-BR', getCurrencySymbol('BRL', 'wide'), 'BRL');
  }

}
