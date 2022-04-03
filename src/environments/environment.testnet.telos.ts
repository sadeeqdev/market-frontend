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
            CheddaBaseTokenVault: '0xCBfa283cCc60CF5151AAf5f73F9513e7321c8483',
            Chedda: '0x8c2B728F8c9F6c1ee7a1339633173102A50c1FeC',
            xChedda: '0x7c21541F02a6A1DCcBD556bd70257178AD889974',
            USDC: '0xACfA6c29730a73463f7df3b15A46075F0f43A3c0',
            mUSDC: '0x2f9bdA241cf548bf31f55b6715B23a1057DfAFE9',
            WrappedNative: '0x7cdaCA59885a4FCC590043d97bdE3f73Df4DE0c5',
            Faucet: '0xAdBCD031E337453a2451f336194F9912Ff3D0893',
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
              name: 'USDC/TLOS Pool',
              address: '0x2f9bdA241cf548bf31f55b6715B23a1057DfAFE9',
              asset: {
                name: 'USD Coin',
                symbol: 'USCD.c',
                address: '0xACfA6c29730a73463f7df3b15A46075F0f43A3c0',
                logo: '/assets/logos/usd-coin-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped TLOS',
                  symbol: 'WTLOS.c',
                  address: '0x7cdaCA59885a4FCC590043d97bdE3f73Df4DE0c5',
                  logo: '/assets/logos/tlos-logo.png'
                },
              ],
              stats: {}
            },
            {
              name: 'DAI/TLOS Pool',
              address: '0x6Ff6aab66Bc6a2BdcD6E2b647AfA84c7e489fd4F',
              asset: {
                name: 'Dai StableCoin',
                symbol: 'DAI.c',
                address: '0xb77193180525d24B5c30F3CFfbE054436EAF1851',
                logo: '/assets/logos/dai-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped TLOS',
                  symbol: 'WTLOS.c',
                  address: '0x7cdaCA59885a4FCC590043d97bdE3f73Df4DE0c5',
                  logo: '/assets/logos/tlos-logo.png'
                },
              ],
              stats: {}
            },
            {
              name: 'FRAX/TLOS Pool',
              address: '0xcd7AbFd6Cb848A5397A29fCC8Cb5D4CE9C993814',
              asset: {
                name: 'Frax',
                symbol: 'FRAX',
                address: '0x4e18E8A38b848ACE0D60937c4699c1D6cF0feAA1',
                logo: '/assets/logos/frax-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped TLOS',
                  symbol: 'WTLOS.c',
                  address: '0x7cdaCA59885a4FCC590043d97bdE3f73Df4DE0c5',
                  logo: '/assets/logos/tlos-logo.png'
                },
              ],
              stats: {}
            },
            {
              name: 'TLOS/Stable Pool',
              address: '0xdE16696ad38ECc993BB1d28304E1B00357ADe8fa',
              asset: {
                name: 'Wrapped TLOS',
                symbol: 'WTLOS.c',
                address: '0x7cdaCA59885a4FCC590043d97bdE3f73Df4DE0c5',
                logo: '/assets/logos/tlos-logo.png'
              },
              collateral: [
                {
                  name: 'USD Coin',
                  symbol: 'USCD.c',
                  address: '0xACfA6c29730a73463f7df3b15A46075F0f43A3c0',
                  logo: '/assets/logos/usd-coin-logo.png'
                },
                {
                  name: 'Dai StableCoin',
                  symbol: 'DAI.c',
                  address: '0xb77193180525d24B5c30F3CFfbE054436EAF1851',
                  logo: '/assets/logos/dai-logo.png'
                },
                {
                  name: 'Frax',
                  symbol: 'FRAX',
                  address: '0x4e18E8A38b848ACE0D60937c4699c1D6cF0feAA1',
                  logo: '/assets/logos/frax-logo.png'
                }
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
            logo: '/assets/logos/tlos-logo.png',
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
  