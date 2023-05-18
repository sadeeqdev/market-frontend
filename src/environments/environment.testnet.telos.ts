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
            CheddaBaseTokenVault: '0xB0A47be6707E3122F1CF4C2259897E6e97380E1A',
            PriceFeed: '0x1E90BBfD4e18b4116Af9dcA4079F021e919519Dd',
            Chedda: '0x578628A324e0af99231D202aBE99f5Ad57BAdC3D',
            xChedda: '0x9dE2Bd78064DAC50B429632E361F9C38A7420ACE',
            veChedda: '0x50B8636a7715Cf81FC9501E8BED292fc2B5ec9CC',
            USDC: '0x464e5fD82cacA90375C27f08D9D68f4433C71fA7',
            DAI: '0x35Bc96883D4bD811Ab684D976dD86FB5dc5F7B2c',
            FRAX: '0x73B6f852ED785B93301dE96e1860f25B176BCa81',
            WrappedNative: '0x8aDfBAD20bBe6CCD33d8Bd412C8AB9f67bc69a71',
            Faucet: '0xd03514EEC1Bda2c88EE8d4Af10A757284934Def4',
            GaugeController: '0x29296e43a7B0149e601A9b6aB7b0C7a1eAb670Dc',
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
              address: '0xB0A47be6707E3122F1CF4C2259897E6e97380E1A',
              asset: {
                name: 'USD Coin',
                symbol: 'USCD.c',
                address: '0x464e5fD82cacA90375C27f08D9D68f4433C71fA7',
                logo: '/assets/logos/usdc-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped TLOS',
                  symbol: 'WTLOS.c',
                  address: '0x8aDfBAD20bBe6CCD33d8Bd412C8AB9f67bc69a71',
                  logo: '/assets/logos/tlos-logo.png'
                },
              ],
              stats: {}
            },
            {
              name: 'DAI/TLOS Pool',
              address: '0x4c12c9C5E754360fb8e8Ed986300C60d588C9e72',
              asset: {
                name: 'Dai StableCoin',
                symbol: 'DAI.c',
                address: '0x35Bc96883D4bD811Ab684D976dD86FB5dc5F7B2c',
                logo: '/assets/logos/dai-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped TLOS',
                  symbol: 'WTLOS.c',
                  address: '0x8aDfBAD20bBe6CCD33d8Bd412C8AB9f67bc69a71',
                  logo: '/assets/logos/tlos-logo.png'
                },
              ],
              stats: {}
            },
            {
              name: 'FRAX/TLOS Pool',
              address: '0x29114AE8FA314dC27e96990182827A29A609e079',
              asset: {
                name: 'Frax',
                symbol: 'FRAX',
                address: '0x73B6f852ED785B93301dE96e1860f25B176BCa81',
                logo: '/assets/logos/frax-logo.png'
              },
              collateral: [
                {
                  name: 'Wrapped TLOS',
                  symbol: 'WTLOS.c',
                  address: '0x8aDfBAD20bBe6CCD33d8Bd412C8AB9f67bc69a71',
                  logo: '/assets/logos/tlos-logo.png'
                },
              ],
              stats: {}
            },
            {
              name: 'TLOS/Stable Pool',
              address: '0x42070Eaf1d7834F92341D58D3a145509E361F6d3',
              asset: {
                name: 'Wrapped TLOS',
                symbol: 'WTLOS.c',
                address: '0x8aDfBAD20bBe6CCD33d8Bd412C8AB9f67bc69a71',
                logo: '/assets/logos/tlos-logo.png'
              },
              collateral: [
                {
                  name: 'USD Coin',
                  symbol: 'USCD.c',
                  address: '0x464e5fD82cacA90375C27f08D9D68f4433C71fA7',
                  logo: '/assets/logos/usdc-logo.png'
                },
                {
                  name: 'Dai StableCoin',
                  symbol: 'DAI.c',
                  address: '0x35Bc96883D4bD811Ab684D976dD86FB5dc5F7B2c',
                  logo: '/assets/logos/dai-logo.png'
                },
                {
                  name: 'Frax',
                  symbol: 'FRAX',
                  address: '0x73B6f852ED785B93301dE96e1860f25B176BCa81',
                  logo: '/assets/logos/frax-logo.png'
                }
              ],
              stats: {}
            },
            {
              name: 'TLOS/Degen Pool',
              address: '0x3abBe7f92206C770963789b1999235ffa731feb9',
              asset: {
                name: 'Wrapped TLOS',
                symbol: 'WTLOS.c',
                address: '0x8aDfBAD20bBe6CCD33d8Bd412C8AB9f67bc69a71',
                logo: '/assets/logos/tlos-logo.png'
              },
              collateral: [
                {
                  name: 'Chedda',
                  symbol: 'CHEDDA',
                  address: '0x578628A324e0af99231D202aBE99f5Ad57BAdC3D',
                  logo: '/assets/logos/chedd-3d-logo.png'
                },
                {
                  name: 'Zappy',
                  symbol: 'ZAP',
                  address: '0x51c5a38de0Ff9a08CD3a15F7044176eBD8939544',
                  logo: '/assets/logos/zappy.png'
                },
                {
                  name: 'OmniDex',
                  symbol: 'CHARM',
                  address: '0xCDfe5cf31E9Ec0316B2db4005A56B3E3BCc99F9b',
                  logo: '/assets/logos/omni.jpeg'
                },
                {
                  name: 'SushiSwap',
                  symbol: 'SUSHI',
                  address: '0xbc10040af614978140b8839Fe050C517e037b8DA',
                  logo: '/assets/logos/sushi.png'
                },
                {
                  name: 'pNetwork',
                  symbol: 'PNT',
                  address: '0x9CA92b4D4E5535FDc7A598B45224ACb284486589',
                  logo: '/assets/logos/pNetwork.png'
                },
                {
                  name: 'Telos Swap',
                  symbol: 'SWAP',
                  address: '0x2Ed2951c19F5CE76B663f32F135252E00B7dDE3B',
                  logo: '/assets/logos/swap.png'
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
  