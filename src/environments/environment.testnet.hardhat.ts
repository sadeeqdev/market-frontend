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
            CheddaDappStore: '0x73C68f1f41e4890D06Ba3e71b9E9DfA555f1fb46',
            CheddaDappMetrics: '0xD2D5e508C82EFc205cAFA4Ad969a4395Babce026',
            CheddaMarket: '0xdB012DD3E3345e2f8D23c0F3cbCb2D94f430Be8C',
            CheddaMarketExplorer: '0xd977422c9eE9B646f64A4C4389a6C98ad356d8C4'
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
  