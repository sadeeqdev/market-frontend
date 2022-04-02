// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: "Telos EVM Testnet",
    jsonRpcUrl: 'https://testnet.telos.net/evm',
    config: {
        contracts: {
            CheddaAddressRegistry: '',
            CheddaXP: '',
            CheddaDappStore: '',
            CheddaDappExplorer: '',
            CheddaMarket: '',
            CheddaMarketExplorer: '',
            CheddaRewards: '',
            CheddaDropManager: '',
            CheddaLoanManager: '',
            ChainlinkPriceConsumer: '',
            CheddaBaseTokenVault: '',
            Chedda: '',
            xChedda: '',
            USDC: '',
            mUSDC: '',
            WrappedNative: '',
            Faucet: '',
            GaugeController: '',
          },
          networkParams: {
            chainId: '0x29',
            chainName: 'Telos EVM Testnet',
            nativeCurrency: {
                name: 'Telos',
                symbol: 'TLOS',
                decimals: 18,
                image: ''
            },
            rpcUrls: ['https://testnet.telos.net/v2/explore/'],
            blockExplorerUrls: ['https://testnet.telos.net/v2/explore/']
          },
          pools: [
            {
              name: 'USDC/WMATIC Pool',
              address: '0x0',
              asset: {
                name: 'USD Coin',
                symbol: 'USCD.c',
                address: '0x0',
                logo: '/assets/logos/usd-coin-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped MATIC',
                  symbol: 'WMATIC.c',
                  address: '0x0',
                  logo: '/assets/logos/matic-token-icon.png'
                },
                {
                  name: 'Weird geek',
                  symbol: 'WGK',
                  address: '0x0',
                  logo: '/assets/logos/wgk-logo.png'
                },
                {
                  name: 'Chedda Fancy Eye',
                  symbol: 'EYE',
                  address: '0x0',
                  logo: '/assets/logos/eye-logo.png'
                },
              ],
              stats: {}
            }
          ],
          faucets: [
            {
              name: 'Telos Testnet Faucet',
              logo: '',
              url: 'https://app.telos.net/testnet/developers/',
            }
          ],
          ui: {
            chainName: 'Telos',
            logo: '/assets/logos/tlos-token-icon.png',
            txUrlPrefix: 'https://testnet.telos.net/evm/tx/'
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
  