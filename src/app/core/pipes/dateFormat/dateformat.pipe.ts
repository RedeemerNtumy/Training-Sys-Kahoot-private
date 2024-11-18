// dateformat.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat',
  standalone: true
})
export class DateformatPipe implements PipeTransform {
  transform(value: string | Date | undefined): string {
    if (!value) return '-'; 

    try {
      const date = new Date(value);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return '-';
      }

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);

      return `${month}/${day}/${year}`;
    } catch (error) {
      return '-';
    }
  }
}
