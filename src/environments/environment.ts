// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: '',
  jsonRpcUrl: '',
  config: {
      contracts: {
          CheddaXP: '',
          CheddaDappStore: '',
          CheddaDappExplorer: '',
          CheddaMarket: '',
          CheddaMarketExplorer: '',
          CheddaRewards: '',
          CheddaDropManager: '',
          CheddaLoanManager: '',
          ChainlinkPriceConsumer: '',
          CheddaBaseTokenVault: '',
          Chedda: '',
          xChedda: '',
          USDC: '',
          DAI: '',
          FRAX: '',
          mUSDC: '',
          WrappedNative: '',
          Faucet: '',
          GaugeController: '',
        },
        networkParams: {
          chainId: '',
          chainName: '',
          nativeCurrency: {
              name: '',
              symbol: '',
              decimals: 18
          },
          rpcUrls: [],
          blockExplorerUrls: []
        },
        faucets: [{
          name: '',
          url: ''
        }],
        pools: [
          {
            name: '',
            address: '',
            asset: {
              name: '',
              symbol:'',
              address: '',
              logo: ''
            },
            collateral: [
              {
                name: '',
                symbol: '',
                address: '',
                logo: ''
              },
            ],
            stats: {},
          }
        ],
        ui: {
          chainName: '',
          logo: '',
          txUrlPrefix: '',
      }
  },
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
