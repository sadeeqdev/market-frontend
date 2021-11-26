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
            CheddaDappStore: '0x7A5EC257391817ef241ef8451642cC6b222d4f8C',
            CheddaDappExplorer: '0x90E75f390332356426B60FB440DF23f860F6A113',
            CheddaMarket: '0x6c383Ef7C9Bf496b5c847530eb9c49a3ED6E4C56',
            CheddaMarketExplorer: '0xAAF0F531b7947e8492f21862471d61d5305f7538'
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
  