import { Pipe, PipeTransform } from '@angular/core';

export interface RewardDescription {
    name: string
    url: string
    rank: number
}
@Pipe({
    name: 'rankReward'
})
export class RankRewardPipe implements PipeTransform {
    transform(rank: number, args?: any): RewardDescription {
        const result = this.rankRewards[rank]
        return result || {}
    }

    rankRewards = {
        0: {
            name: 'None',
            url: '',
            rank: 0
        },
        1: {
            name: 'Associate',
            url: '/assets/images/badges/png/Associate.png',
            rank: 1
        },
        2: {
            name: 'Soldier',
            url: '/assets/images/badges/png/Soldier.png',
            rank: 2
        },
        3: {
            name: 'Caporegime',
            url: '/assets/images/badges/png/Capo.png',
            rank: 3
        },
        4: {
            name: 'Consigliere',
            url: 'assets/images/badges/png/Consigliere.png',
            rank: 4
        },
        5: {
            name: 'Underboss',
            url: 'assets/images/badges/png/Underboss.png',
            rank: 5
        },
        6: {
            name: 'Boss',
            url: '/assets/images/badges/png/Boss.png',
            rank: 6
        },
        7: {
            name: 'Godfather',
            url: '/assets/images/badges/png/Godfather.png',
            rank: 7
        }
    }
}