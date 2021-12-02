// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: 'Hardhat', 
    jsonRpcUrl: 'http://localhost:8545',
    config: {
        contracts: {
            CheddaXP: '0x30c54E9c99147620BD6fBC2D9b0CE90b4FBc80eF',
            CheddaDappStore: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
            CheddaDappExplorer: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
            CheddaMarket: '0x6c383Ef7C9Bf496b5c847530eb9c49a3ED6E4C56',
            CheddaMarketExplorer: '0xAAF0F531b7947e8492f21862471d61d5305f7538',
            CheddaRewards: '',
          },
          networkParams: {
            chainId: '0x7a69',
            chainName: 'Hardhat Testnet',
            nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: ['http://localhost:8545'],
            blockExplorerUrls: [],
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
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  