// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: 'Hardhat', 
    jsonRpcUrl: 'http://localhost:8545',
    config: {
        contracts: {
            Chedda: '',
            CheddaDappStore: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            CheddaDappMetrics: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            CheddaMarket: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
            CheddaMarketExplorer: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
          },
          networkParams: {
            chainId: '0x7A69',
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
  