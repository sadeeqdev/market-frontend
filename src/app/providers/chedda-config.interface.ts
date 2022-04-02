import { NetworkParams } from "./network-params.interface";

export interface CheddaConfig {
    contracts: {
        CheddaXP: string
        CheddaDappStore: string
        CheddaDappExplorer: string
        CheddaMarket: string
        CheddaMarketExplorer: string
        CheddaRewards: string
        CheddaDropManager: string
        CheddaLoanManager: string
        ChainlinkPriceConsumer: string
        CheddaBaseTokenVault: string
        Chedda: string
        xChedda: string
        USDC: string
        mUSDC: string
        GaugeController: string,
        WrappedNative: string
        Faucet: string
    },
    networkParams: NetworkParams
}
