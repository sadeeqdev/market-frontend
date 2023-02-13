import { NetworkParams } from "./network-params.interface";

export interface CheddaConfig {
    contracts: {
        ChainlinkPriceConsumer: string
        CheddaMarketExplorer: string
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
        NFT: string
        GaugeController: string,
        WrappedNative: string
        Faucet: string
    },
    networkParams: NetworkParams
}
