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
        PriceFeed: string
        Chedda: string
        xChedda: string
        veChedda: string
        USDC: string
        mUSDC: string
        DAI: string
        FRAX: string
        UXD: string
        GaugeController: string,
        WrappedNative: string
        Faucet: string
    },
    networkParams: NetworkParams
}
