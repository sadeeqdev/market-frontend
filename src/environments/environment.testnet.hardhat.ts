// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: 'Hardhat Network', 
    jsonRpcUrl: 'http://localhost:8545',
    config: {
        contracts: {
            CheddaAddressRegistry: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            CheddaXP: '0x9A676e781A523b5d0C0e43731313A708CB607508',
            CheddaDappStore: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
            CheddaDappExplorer: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
            CheddaMarket: '0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E',
            CheddaMarketExplorer: '0x9E545E3C0baAB3E08CdfD552C960A1050f373042',
            CheddaRewards: '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
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
          },
          faucets: [],
          ui: {
            chainName: 'Hardhat',
            logo: '/assets/logos/harmony-logo.png',
            txUrlPrefix: 'http://localhost:8545/tx/'
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
  