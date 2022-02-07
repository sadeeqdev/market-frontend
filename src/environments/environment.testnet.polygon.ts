// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: "Polygon Mumbai Testnet",
    jsonRpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/-7eaLgpDD6dzJaDq2J2FlKM46uEzatAs',
    config: {
        contracts: {
            CheddaAddressRegistry: '0x64Db1ba9db64CB1272968489cc8766CE8954Ef0C',
            CheddaXP: '0x82dd206a905000CD67440b3823FC494aBF203eC9',
            CheddaDappStore: '0x942940777Bd572789d72C8EcfA41f211F290167C',
            CheddaDappExplorer: '0xe785e9D0f6110F0897930d7dC5b2cF587ad25317',
            CheddaMarket: '0x63d6378a9873a8Bc79695886e80309297f65684D',
            CheddaMarketExplorer: '0xbd7ba2220C7622346D980c8E8cf92506d8992144',
            CheddaRewards: '0xc451D8e3B20fA48DfdaB72F66A2c7E0e34Af637e',
            CheddaDropManager: '0xfe29f9595fef194Cb433bF1eF91f1c57801afE0e',
            CheddaLoanManager: '0x4a171D4CC2F371C4Dfc82469a473323afa5c7298',
            ChainlinkPriceConsumer: '0xDd558ACa8cd32D77Bf2e63D25a94691C32eb44D4',
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
              logo: '',
              url: 'https://faucet.polygon.technology/',
            }
          ],
          ui: {
            chainName: 'Polygon',
            logo: '/assets/logos/matic-token-icon.png',
            txUrlPrefix: 'https://mumbai.polygonscan.com/tx/'
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
  