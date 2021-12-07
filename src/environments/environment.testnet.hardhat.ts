// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: 'Hardhat', 
    jsonRpcUrl: 'http://localhost:8545',
    config: {
        contracts: {
            CheddaAddressRegistry: '0xE3011A37A904aB90C8881a99BD1F6E21401f1522',
            CheddaXP: '0x1f10F3Ba7ACB61b2F50B9d6DdCf91a6f787C0E82',
            CheddaDappStore: '0x5fc748f1FEb28d7b76fa1c6B07D8ba2d5535177c',
            CheddaDappExplorer: '0x2a810409872AfC346F9B5b26571Fd6eC42EA4849',
            CheddaMarket: '0x8A93d247134d91e0de6f96547cB0204e5BE8e5D8',
            CheddaMarketExplorer: '0xF32D39ff9f6Aa7a7A64d7a4F00a54826Ef791a55',
            CheddaRewards: '0x525C7063E7C20997BaaE9bDa922159152D0e8417',
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
  