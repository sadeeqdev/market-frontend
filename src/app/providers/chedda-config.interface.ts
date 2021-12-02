import { NetworkParams } from "./network-params.interface";

export interface CheddaConfig {
    contracts: {
        CheddaXP: string
        CheddaDappStore: string
        CheddaDappExplorer: string
        CheddaMarket: string
        CheddaMarketExplorer: string
        CheddaRewards: string
    }
    networkParams: NetworkParams
}