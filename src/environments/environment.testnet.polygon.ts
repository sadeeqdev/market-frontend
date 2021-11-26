// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: "Polygon Mumbai Testnet",
    jsonRpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/-7eaLgpDD6dzJaDq2J2FlKM46uEzatAs',
    config: {
        contracts: {
            Chedda: '',
            CheddaDappStore: '0xC674307d98625034C557907c7a628EffccFF1278',
            CheddaDappExplorer: '0x88e81dCdD8fdbEFfACa606e59e9d26876bfFb181',
            CheddaMarket: '0x1916022D451D4D6083bE60072c9CeD86E95C7e3b',
            CheddaMarketExplorer: '0xFCabEc24F9A3daE2fA8e3b34E82254ad42f1E9De'
          },
          networkParams: {
            chainId: '0x13881',
            chainName: 'Polygon Mumbai Testnet',
            nativeCurrency: {
                name: 'Matic',
                symbol: 'MATIC',
                decimals: 18,
                image: ''
            },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/']
          },
          faucets: [
            {
              name: 'Polygon Mumbai Faucet',
              icon: '',
              url: '',
            }
          ],
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
  