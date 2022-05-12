// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: "Harmony ONE Testnet",
  jsonRpcUrl: 'https://api.s0.b.hmny.io',
  config: {
      contracts: {
          CheddaAddressRegistry: '0xD9df45A2C9A7bF313D264AB8A0D142295F9a68Cb',
          CheddaXP: '',
          CheddaDappStore: '',
          CheddaDappExplorer: '',
          CheddaMarket: '',
          CheddaMarketExplorer: '',
          CheddaRewards: '',
          CheddaDropManager: '',
          CheddaLoanManager: '',
          ChainlinkPriceConsumer: '',
          CheddaBaseTokenVault: '0xCDfe5cf31E9Ec0316B2db4005A56B3E3BCc99F9b',
          PriceFeed: '0x1E90BBfD4e18b4116Af9dcA4079F021e919519Dd',
          Chedda: '0x399AEF88c8B98A37EEB4f8d646E8475E601d8Da5',
          xChedda: '0x49a4Ad3ADd3eF46a1dA27FEd0280F70276fb3ba6',
          veChedda: '0xF1C9A7F507EB3A10f7710f933961AA7599B384B9',
          USDC: '0x324bdE7aA1b130bE41E6eE79d5B6f60Db2dE2D62',
          mUSDC: '0xCDfe5cf31E9Ec0316B2db4005A56B3E3BCc99F9b',
          DAI: '0x5BCf9dEe88Db86430E05bd244A31235163ee2B88',
          FRAX: '0x1B214b0835ed8fb2B9b585bCeA944bC41AeeE8b8',
          WrappedNative: '0x1f17Aa8f056Fe13AE33815f207F3a8B9f7FE4C25',
          Faucet: '0xe772dBbA0d9aDBB48f3451b8a6Bdb13c51D8F446',
          GaugeController: '0xb9E5930B2d3cf5ea6fA57D578a71A07D6Ae470a5',
        },
        networkParams: {
          chainId: '0x6357D2E0',
          chainName: 'Harmony ONE Testnet',
          nativeCurrency: {
              name: 'ONE',
              symbol: 'ONE',
              decimals: 18,
              image: ''
          },
          rpcUrls: ['https://api.s0.b.hmny.io'],
          blockExplorerUrls: ['https://explorer.pops.one/']
        },
        pools: [
          {
            name: 'USDC/ONE Pool',
            address: '0xCDfe5cf31E9Ec0316B2db4005A56B3E3BCc99F9b',
            asset: {
              name: 'USD Coin',
              symbol: 'USCD.c',
              address: '0x324bdE7aA1b130bE41E6eE79d5B6f60Db2dE2D62',
              logo: '/assets/logos/usd-coin-logo.png'
            },
            collateral: [
              {
                name: 'Wrapped ONE',
                symbol: 'WONE.c',
                address: '0x1f17Aa8f056Fe13AE33815f207F3a8B9f7FE4C25',
                logo: '/assets/logos/harmony-logo.png'
              },
            ],
            stats: {}
          },
          {
            name: 'DAI/ONE Pool',
            address: '0x180ad74692432C126A51EE0CF313Cd05C26af4f7',
            asset: {
              name: 'Dai StableCoin',
              symbol: 'DAI.c',
              address: '0x5BCf9dEe88Db86430E05bd244A31235163ee2B88',
              logo: '/assets/logos/dai-logo.png'
            },
            collateral: [
              {
                name: 'Wrapped ONE',
                symbol: 'WONE.c',
                address: '0x1f17Aa8f056Fe13AE33815f207F3a8B9f7FE4C25',
                logo: '/assets/logos/harmony-logo.png'
              },
            ],
            stats: {}
          },
          {
            name: 'FRAX/ONE Pool',
            address: '0xe26ad5248ef917792e9540A8e688BfCA57d55441',
            asset: {
              name: 'Frax',
              symbol: 'FRAX',
              address: '0x1B214b0835ed8fb2B9b585bCeA944bC41AeeE8b8',
              logo: '/assets/logos/frax-logo.png'
            },
            collateral: [
              {
                name: 'Wrapped ONE',
                symbol: 'WONE.c',
                address: '0x1f17Aa8f056Fe13AE33815f207F3a8B9f7FE4C25',
                logo: '/assets/logos/harmony-logo.png'
              },
            ],
            stats: {}
          },
          {
            name: 'ONE/Stable Pool',
            address: '0x2771d999F9b38eD9e7508494acb22eD2301c8fC3',
            asset: {
              name: 'Wrapped ONE',
              symbol: 'WONE.c',
              address: '0x1f17Aa8f056Fe13AE33815f207F3a8B9f7FE4C25',
              logo: '/assets/logos/harmony-logo.png'
            },
            collateral: [
              {
                name: 'USD Coin',
                symbol: 'USCD.c',
                address: '0x324bdE7aA1b130bE41E6eE79d5B6f60Db2dE2D62',
                logo: '/assets/logos/usd-coin-logo.png'
              },
              {
                name: 'Dai StableCoin',
                symbol: 'DAI.c',
                address: '0x5BCf9dEe88Db86430E05bd244A31235163ee2B88',
                logo: '/assets/logos/dai-logo.png'
              },
              {
                name: 'Frax',
                symbol: 'FRAX',
                address: '0x1B214b0835ed8fb2B9b585bCeA944bC41AeeE8b8',
                logo: '/assets/logos/frax-logo.png'
              }
            ],
            stats: {}
          },
          {
            name: 'ONE/Degen Pool',
            address: '0x3abBe7f92206C770963789b1999235ffa731feb9',
            asset: {
              name: 'Wrapped ONE',
              symbol: 'WONE.c',
              address: '0x1f17Aa8f056Fe13AE33815f207F3a8B9f7FE4C25',
              logo: '/assets/logos/harmony-logo.png'
            },
            collateral: [
              {
                name: 'Chedda',
                symbol: 'CHEDDA',
                address: '0x578628A324e0af99231D202aBE99f5Ad57BAdC3D',
                logo: '/assets/logos/chedda-logo-square.png'
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
                name: 'Viper Swap',
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
          chainName: 'Harmony ONE',
          logo: '/assets/logos/harmony-logo.png',
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
