import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'truncateDecimal'
})

export class TruncateDecimalPipe implements PipeTransform {

transform(value: number, args: number[]): number {
    var multiplier = Math.pow(10, args[0]),
        adjustedNum = value * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
}
}