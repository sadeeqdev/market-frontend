import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'loanState'
})
export class LoanStatePipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 1:
                return 'open'
            case 2:
                return 'repaid'
            case 3:
                return 'cancelled'
            default:
                return '-';
        }
    }
}

@Pipe({
    name: 'loanRequestState'
})
export class LoanRequestStatePipe implements PipeTransform {

    transform(value: number): string {
        switch (value) {
            case 1:
                return 'pending'
            case 2:
                return 'cancelled'
            case 3:
                return 'accepted'
            default:
                return '-';
        }
    }
}