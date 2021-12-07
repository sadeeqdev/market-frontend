// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: 'Hardhat', 
    jsonRpcUrl: 'http://localhost:8545',
    config: {
        contracts: {
            CheddaXP: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            CheddaDappStore: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
            CheddaDappExplorer: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
            CheddaMarket: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
            CheddaMarketExplorer: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
            CheddaRewards: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
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
  