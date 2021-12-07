// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: 'Hardhat', 
    jsonRpcUrl: 'http://localhost:8545',
    config: {
        contracts: {
            CheddaXP: '0xAD523115cd35a8d4E60B3C0953E0E0ac10418309',
            CheddaDappStore: '0x02df3a3F960393F5B349E40A599FEda91a7cc1A7',
            CheddaDappExplorer: '0x1780bCf4103D3F501463AD3414c7f4b654bb7aFd',
            CheddaMarket: '0x71089Ba41e478702e1904692385Be3972B2cBf9e',
            CheddaMarketExplorer: '0xC66AB83418C20A65C3f8e83B3d11c8C3a6097b6F',
            CheddaRewards: '0x2b5A4e5493d4a54E717057B127cf0C000C876f9B',
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
  