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
            CheddaBaseTokenVault: '0x98bca9f9508815d4400057797A3Fa397815dDaE0',
            Chedda: '0x4E216D9D34Fd1c6609cCa8f5bcACF5d1beEDe9c7',
            xChedda: '0x411A84eD193db7d978BC047ACE48c1174c5e9120',
            USDC: '0xD294C4B008bfd4b3F7f08C6971Ca4f50BFdD3D88',
            mUSDC: '0xaff2587D12C6F27ACa7dA5c431b82BADa1d11edf',
            WrappedNative: '0x2c5E809920f1d2b7e24F35e98816fA3314A362e2',
            Faucet: '0xa0DDF73A63EBe3355d8255e7561b2Ae75be4EDa6',
            GaugeController: '0xCB9E954baaE6D1696c0F79024b65d3e04c607740',
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
          pools: [
            {
              name: 'USDC/WMATIC Pool',
              address: '0xDFfC4eeB22dF1fC1A65B29802f5b6dAa99b4659A',
              asset: {
                name: 'USD Coin',
                symbol: 'USCD.c',
                address: '0x85d02ddE4382F144c8D77D8a3aE0B49441Eeff97',
                logo: '/assets/logos/usd-coin-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped MATIC',
                  symbol: 'WMATIC.c',
                  address: '0x2c5E809920f1d2b7e24F35e98816fA3314A362e2',
                  logo: '/assets/logos/matic-token-icon.png'
                },
              ]
            },
            {
              name: 'DAI/WMATIC Pool',
              address: '0xFDC142B9C96CC45321376F79b2b0017D80773aFE',
              asset: {
                name: 'Dai Stalbcoin',
                symbol: 'DAI',
                address: '0x7079ef81bcFB2CfBE9699c79238b690a76848c73',
                logo: '/assets/logos/dai-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped MATIC',
                  symbol: 'WMATIC.c',
                  address: '0x2c5E809920f1d2b7e24F35e98816fA3314A362e2',
                  logo: '/assets/logos/matic-token-icon.png'
                },
              ]
            },
            {
              name: 'FRAX/WMATIC Pool',
              address: '0xBac84b73A248Bd247169ec7727071544392dA20E',
              asset: {
                name: 'Frax',
                symbol: 'FRAX',
                address: '0xbb53367653e91585533fFE91D22cba2179323537',
                logo: '/assets/logos/frax-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped MATIC',
                  symbol: 'WMATIC.c',
                  address: '0x2c5E809920f1d2b7e24F35e98816fA3314A362e2',
                  logo: '/assets/logos/matic-token-icon.png'
                },
              ]
            },
            {
              name: 'Native Asset Pool',
              address: '0x2D01f2D9b4A453DCEe3aDa5d630aFA1d800009D0',
              asset: {
                name: 'Wrapped MATIC',
                symbol: 'WMATIC.c',
                address: '0x2c5E809920f1d2b7e24F35e98816fA3314A362e2',
                logo: '/assets/logos/matic-token-icon.png'
              },
              collateral: [
                {
                  name: 'USD Coin',
                  symbol: 'USCD.c',
                  address: '0x85d02ddE4382F144c8D77D8a3aE0B49441Eeff97',
                  logo: '/assets/logos/usd-coin-logo.png'
                },
                {
                  name: 'Dai Stalbcoin',
                  symbol: 'DAI',
                  address: '0x7079ef81bcFB2CfBE9699c79238b690a76848c73',
                  logo: '/assets/logos/dai-logo.png'
                },
                {
                  name: 'Frax',
                  symbol: 'FRAX',
                  address: '0xbb53367653e91585533fFE91D22cba2179323537',
                  logo: '/assets/logos/frax-logo.png'
                }
              ]
            },
            {
              name: 'USDC/WMATIC Pool',
              address: '0x53637c9dC575C66ce106F6e250c5e58E192DD5bD',
              asset: {
                name: 'USD Coin',
                symbol: 'USCD.c',
                address: '0x14d8C077FbFB0Bb9657C3E4D4f8E20eC7E1C7D6B',
                logo: '/assets/logos/usd-coin-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped MATIC',
                  symbol: 'WMATIC.c',
                  address: '0xA36d30A62Cf2E1D4731A32DFD3d468514FFA99d9',
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
  