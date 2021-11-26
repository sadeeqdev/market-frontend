import { NetworkParams } from "./network-params.interface";

export interface CheddaConfig {
    contracts: {
        Chedda: string
        CheddaDappStore: string
        CheddaDappExplorer: string
        CheddaMarket: string
        CheddaMarketExplorer: string
    }
    networkParams: NetworkParams
}