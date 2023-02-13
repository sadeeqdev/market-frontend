// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: "Oasis Emerald Testnet",
    jsonRpcUrl: 'https://testnet.emerald.oasis.dev',
    config: {
      contracts: {
        ChainlinkPriceConsumer: '',
        CheddaMarketExplorer: '',
        CheddaBaseTokenVault: '0xB0A47be6707E3122F1CF4C2259897E6e97380E1A',
        PriceFeed: '0xEDFa988f9498165fE79f09dA9e39f9dC829507D7',
        Chedda: '0x89658069fc4b3e528F651405c9d71583eB9D2344',
        xChedda: '0x434fDe54E416d7c56c644E9b2AbCAff943D5163A',
        veChedda: '0xc0B3a48DBe196ECfb14A65a2FA6aD5DaD07C866f',
        USDC: '0x8457106E861a67B989a2ea398DF3A045331E5115',
        mUSDC: '0xe88AF62fe2117565cB6B2c206e820Cb8d4Bce91a',
        DAI: '0xd2D5708116Aad9bD6bC90058dC538aF6645c1daE',
        FRAX: '0xdf95b12492A3B631Af60BbCD7F1Ba4306CdA6918',
        UXD: '',
        WrappedNative: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
        Faucet: '0x5b3AaF77dd6E086241a101A47E8cDA34A1059ee6',
        GaugeController: '0xb1bE9510691DfAa3D73C3A6C17E494EEC9899E4F',
        NFT: ''
      },
          networkParams: {
            chainId: '0xA515',
            chainName: 'Oasis Emerald Testnet',
            nativeCurrency: {
                name: 'Rose',
                symbol: 'ROSE',
                decimals: 18,
                image: ''
            },
            rpcUrls: ['https://testnet.emerald.oasis.dev/'],
            blockExplorerUrls: ['https://testnet.explorer.emerald.oasis.dev/']
          },
          pools: [
            {
              name: 'USDC/ROSE Pool',
              address: '0xe88AF62fe2117565cB6B2c206e820Cb8d4Bce91a',
              asset: {
                name: 'USD Coin',
                symbol: 'USCD.c',
                address: '0x8457106E861a67B989a2ea398DF3A045331E5115',
                logo: '/assets/logos/usd-coin-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped ROSE',
                  symbol: 'WROSE.c',
                  address: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
                  logo: '/assets/logos/oasis-logo-sm.png'
                },
              ],
              stats: {}
            },
            {
              name: 'DAI/ROSE Pool',
              address: '0x67CcB23977336be1eA1E65B8e85Dda525ebC8EaA',
              asset: {
                name: 'Dai StableCoin',
                symbol: 'DAI.c',
                address: '0xd2D5708116Aad9bD6bC90058dC538aF6645c1daE',
                logo: '/assets/logos/dai-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped ROSE',
                  symbol: 'WROSE.c',
                  address: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
                  logo: '/assets/logos/oasis-logo-sm.png'
                },
              ],
              stats: {}
            },
            {
              name: 'FRAX/ROSE Pool',
              address: '0xB8af6CD1B8cb85c871B92108A120f2E9BE48E826',
              asset: {
                name: 'Frax',
                symbol: 'FRAX',
                address: '0xdf95b12492A3B631Af60BbCD7F1Ba4306CdA6918',
                logo: '/assets/logos/frax-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped ROSE',
                  symbol: 'WROSE.c',
                  address: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
                  logo: '/assets/logos/oasis-logo-sm.png'
                },
              ],
              stats: {}
            },
            {
              name: 'ROSE/Stable Pool',
              address: '0xCD89dE2ED157ddaC4a67E233e0cAdB03Bb3106f6',
              asset: {
                name: 'Wrapped ROSE',
                symbol: 'WROSE.c',
                address: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
                logo: '/assets/logos/oasis-logo-sm.png'
              },
              collateral: [
                {
                  name: 'USD Coin',
                  symbol: 'USCD.c',
                  address: '0x8457106E861a67B989a2ea398DF3A045331E5115',
                  logo: '/assets/logos/usd-coin-logo.png'
                },
                {
                  name: 'UXD Coin',
                  symbol: 'UXD',
                  address: '0x1bf0aeb4C1A1C0896887814d679defcc1325EdE3',
                  logo: '/assets/logos/uxd-logo.png'
                },
                {
                  name: 'Dai StableCoin',
                  symbol: 'DAI.c',
                  address: '0xd2D5708116Aad9bD6bC90058dC538aF6645c1daE',
                  logo: '/assets/logos/dai-logo.png'
                },
                {
                  name: 'Frax',
                  symbol: 'FRAX',
                  address: '0xdf95b12492A3B631Af60BbCD7F1Ba4306CdA6918',
                  logo: '/assets/logos/frax-logo.png'
                }
              ],
              stats: {}
            },
            {
              name: 'ROSE/Degen Pool',
              address: '0xD992662A5E886336Ba42A1925AB584a30e4BeB7C',
              asset: {
                name: 'Wrapped ROSE',
                symbol: 'WROSE.c',
                address: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
                logo: '/assets/logos/oasis-logo-sm.png'
              },
              collateral: [
                {
                  name: 'Chedda',
                  symbol: 'CHEDDA',
                  address: '0x89658069fc4b3e528F651405c9d71583eB9D2344',
                  logo: '/assets/logos/chedda-logo-square.png'
                },
                {
                  name: 'Valley Swap',
                  symbol: 'VS',
                  address: '0xB0A47be6707E3122F1CF4C2259897E6e97380E1A',
                  logo: '/assets/logos/valleyswap.png'
                },
                {
                  name: 'YUZUSwap',
                  symbol: 'YUZU',
                  address: '0xA2cfE619cDd3bc1F051890Cea945CC145a45770B',
                  logo: '/assets/logos/yuzuswap-logo.png'
                },
                {
                  name: 'Fountain Protocol',
                  symbol: 'FTP',
                  address: '0x4c12c9C5E754360fb8e8Ed986300C60d588C9e72',
                  logo: '/assets/logos/fountain-logo.png'
                },
              ],
              stats: {}
            }
          ],
          faucets: [
            {
              name: 'Rose Testnet Faucet',
              logo: '',
              url: '',
            }
          ],
          ui: {
            chainName: 'Oasis',
            logo: '/assets/logos/oasis-logo-sm.png',
            txUrlPrefix: 'https://testnet.explorer.emerald.oasis.dev/txs/'
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
  