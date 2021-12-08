// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: 'Hardhat', 
    jsonRpcUrl: 'http://localhost:8545',
    config: {
        contracts: {
            CheddaAddressRegistry: '0xbf2ad38fd09F37f50f723E35dd84EEa1C282c5C9',
            CheddaXP: '0xF66CfDf074D2FFD6A4037be3A669Ed04380Aef2B',
            CheddaDappStore: '0x90b97E83e22AFa2e6A96b3549A0E495D5Bae61aF',
            CheddaDappExplorer: '0xDDa0648FA8c9cD593416EC37089C2a2E6060B45c',
            CheddaMarket: '0xc6B407503dE64956Ad3cF5Ab112cA4f56AA13517',
            CheddaMarketExplorer: '0x6A47346e722937B60Df7a1149168c0E76DD6520f',
            CheddaRewards: '0x20d7B364E8Ed1F4260b5B90C41c2deC3C1F6D367',
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
  