import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rounding'
})

export class RoundingPipe implements PipeTransform {

    transform(value: string, args: any[]): string {
        const num: number = +value
        console.log('num = ', num)
        return num.toFixed(args[0])
    }
}