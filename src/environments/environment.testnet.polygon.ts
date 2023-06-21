// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'Polygon Mumbai Testnet',
  jsonRpcUrl:
    'https://polygon-mumbai.infura.io/v3/d674ad7889a4404c960e18610cf74a3a',
  config: {
    contracts: {
      CheddaBaseTokenVault: '0x801CA2D77CC8e550883E1e649f8f4D6b94D090b5',
      ChainlinkPriceConsumer: '',
      CheddaMarketExplorer: '',
      PriceFeed: '0x0d47B32366012F06D125C2cC2cC98396D81d3786',
      Chedda: '0x36c52Ded7fdC1cAc86C6997Cc1371997A7560dF6',
      xChedda: '0xBca02EaD15f58c66B4bA772BaFdC5b0Fc124309D',
      veChedda: '0xa8b8b2E444f843AEa0C0e25B72c2c1479190Bb36',
      USDC: '0xA485898266c91BcBBeF40F5d838423a751bb906d',
      DAI: '0x7BCa6605845A9030e6943db2D16bF5AeE7E51d94',
      FRAX: '0x58913d4AB4bF61B97086708d55d167c4004CdcEb',
      UXD: '0x4F40FFC513FcCf60A354020Dbc1aE857f84797F2',
      NFT: '0xc863a31cFB3F02c486e63971cb7D9Fb5aB302C86',
      mUSDC: '',
      WrappedNative: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
      Faucet: '0xD83401901b49270b5f669922Df210a349a531E58',
      GaugeController: '0x7Eb31481723D355d8026A24332CD410A14cCe700',
    },
    networkParams: {
      chainId: '0x13881',
      chainName: 'Polygon Mumbai Testnet',
      nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
        image: '',
      },
      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
    pools: [
      {
        name: 'USDC/WMATIC Pool',
        address: '0x16f2D05961cC81555b1f1320fF6289BAd5796616',
        asset: {
          name: 'USD Coin',
          symbol: 'USCD.c',
          address: '0xA485898266c91BcBBeF40F5d838423a751bb906d',
          logo: '/assets/logos/usdc-logo.png',
        },
        collateral: [
          {
            name: 'Wrapped MATIC',
            symbol: 'WMATIC.c',
            address: '0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313',
            logo: '/assets/logos/matic-logo.png',
          },
        ],
      },
      {
        name: 'DAI/WMATIC Pool',
        address: '0xB61cAe70a7f31e8A9EE61e15B472019bE2dC7A81',
        asset: {
          name: 'Dai Stalbcoin',
          symbol: 'DAI',
          address: '0x7BCa6605845A9030e6943db2D16bF5AeE7E51d94',
          logo: '/assets/logos/dai-logo.png',
        },
        collateral: [
          {
            name: 'Wrapped MATIC',
            symbol: 'WMATIC.c',
            address: '0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313',
            logo: '/assets/logos/matic-logo.png',
          },
        ],
      },
      {
        name: 'UXD/WMATIC Pool',
        address: '0xDd58aD73b067fd6151802cEF41F823ecA7C7d111',
        asset: {
          name: 'UXD',
          symbol: 'UXD',
          address: '0x4F40FFC513FcCf60A354020Dbc1aE857f84797F2',
          logo: '/assets/logos/uxd-logo.png',
        },
        collateral: [
          {
            name: 'Wrapped MATIC',
            symbol: 'WMATIC.c',
            address: '0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313',
            logo: '/assets/logos/matic-logo.png',
          },
        ],
      },
      {
        name: 'Native Asset Pool',
        address: '0x0FE9d9C463d377e8741F02FCaD6DaCd1D6A67B41',
        asset: {
          name: 'Wrapped MATIC',
          symbol: 'WMATIC.c',
          address: '0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313',
          logo: '/assets/logos/matic-logo.png',
        },
        collateral: [
          {
            name: 'USD Coin',
            symbol: 'USCD.c',
            address: '0xA485898266c91BcBBeF40F5d838423a751bb906d',
            logo: '/assets/logos/usdc-logo.png',
          },
          {
            name: 'Dai Stalbcoin',
            symbol: 'DAI',
            address: '0x7BCa6605845A9030e6943db2D16bF5AeE7E51d94',
            logo: '/assets/logos/dai-logo.png',
          },
          {
            name: 'Frax',
            symbol: 'FRAX',
            address: '0x58913d4AB4bF61B97086708d55d167c4004CdcEb',
            logo: '/assets/logos/frax-logo.png',
          },
        ],
      },
      {
        name: 'USDC/WMATIC/WGK Pool',
        address: '0x704F620FA72299F4e3B7c9f848BDD136a9Ac8209',
        asset: {
          name: 'USD Coin',
          symbol: 'USCD.c',
          address: '0xA485898266c91BcBBeF40F5d838423a751bb906d',
          logo: '/assets/logos/usdc-logo.png',
        },
        collateral: [
          {
            name: 'Quickswap',
            symbol: 'QUICK',
            address: '0x997904432Be92B8f37b986a16E90aB31e4D54891',
            logo: '/assets/logos/quickswap-logo.png',
          },
          {
            name: 'GALA Games',
            symbol: 'GALA',
            address: '0x76DA732A6fAF51ffd7877aA645BDD456Da686144',
            logo: '/assets/logos/gala-logo.png',
          },
          {
            name: 'MM Finance',
            symbol: 'MMF',
            address: '0x28518998DB48BEC4a1d6dFe2Dc2a288ad28CC862',
            logo: '/assets/logos/mmfinance-logo.png',
          }, 
          {
            name: 'Weird geek',
            symbol: 'WGK',
            address: '0xc863a31cFB3F02c486e63971cb7D9Fb5aB302C86',
            logo: '/assets/logos/wgk-logo.png',
            isNFT: true
          }
        ],
        stats: {},
      },
    ],
    faucets: [
      {
        name: 'Polygon Mumbai Faucet',
        logo: '',
        url: 'https://faucet.polygon.technology/',
      },
    ],
    ui: {
      chainName: 'Polygon',
      logo: '/assets/logos/matic-logo.png',
      txUrlPrefix: 'https://mumbai.polygonscan.com/tx/',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
