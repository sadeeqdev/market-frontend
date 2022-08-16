// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'Polygon Mumbai Testnet',
  jsonRpcUrl:
    'https://polygon-mumbai.g.alchemy.com/v2/-7eaLgpDD6dzJaDq2J2FlKM46uEzatAs',
  config: {
    contracts: {
      CheddaAddressRegistry: '',
      ChainlinkPriceConsumer: '',
      CheddaXP: '',
      CheddaDappStore: '',
      CheddaDappExplorer: '',
      CheddaMarket: '',
      CheddaMarketExplorer: '',
      CheddaRewards: '',
      CheddaDropManager: '',
      CheddaLoanManager: '',
      mUSDC: '',
      CheddaBaseTokenVault: '0x801CA2D77CC8e550883E1e649f8f4D6b94D090b5',
      PriceFeed: '0x0d47B32366012F06D125C2cC2cC98396D81d3786',
      Chedda: '0x36c52Ded7fdC1cAc86C6997Cc1371997A7560dF6',
      xChedda: '0xBca02EaD15f58c66B4bA772BaFdC5b0Fc124309D',
      veChedda: '0xa8b8b2E444f843AEa0C0e25B72c2c1479190Bb36',
      USDC: '0xA485898266c91BcBBeF40F5d838423a751bb906d',
      DAI: '0x7BCa6605845A9030e6943db2D16bF5AeE7E51d94',
      FRAX: '0x58913d4AB4bF61B97086708d55d167c4004CdcEb',
      UXD: '0x4F40FFC513FcCf60A354020Dbc1aE857f84797F2',
      WrappedNative: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
      Faucet: '0x5b3AaF77dd6E086241a101A47E8cDA34A1059ee6',
      GaugeController: '0x5b6996DCCA7A84FEebAc43eC12683fAb5B713B40',
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
        address: '0x801CA2D77CC8e550883E1e649f8f4D6b94D090b5',
        asset: {
          name: 'USD Coin',
          symbol: 'USCD.c',
          address: '0xA485898266c91BcBBeF40F5d838423a751bb906d',
          logo: '/assets/logos/usd-coin-logo.png',
        },
        collateral: [
          {
            name: 'Wrapped MATIC',
            symbol: 'WMATIC.c',
            address: '0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313',
            logo: '/assets/logos/matic-token-icon.png',
          },
        ],
      },
      {
        name: 'DAI/WMATIC Pool',
        address: '0x89d4831ea7cC1d2f740ef269c33c9eEcB2B3e40C',
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
            logo: '/assets/logos/matic-token-icon.png',
          },
        ],
      },
      {
        name: 'FRAX/WMATIC Pool',
        address: '0xc9411075921c7c0DaB91FD55576ba9379228842f',
        asset: {
          name: 'Frax',
          symbol: 'FRAX',
          address: '0x58913d4AB4bF61B97086708d55d167c4004CdcEb',
          logo: '/assets/logos/frax-logo.png',
        },
        collateral: [
          {
            name: 'Wrapped MATIC',
            symbol: 'WMATIC.c',
            address: '0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313',
            logo: '/assets/logos/matic-token-icon.png',
          },
        ],
      },
      {
        name: 'Native Asset Pool',
        address: '0x9e28893A241841806F7EDEAf2DfE5E591D4FD564',
        asset: {
          name: 'Wrapped MATIC',
          symbol: 'WMATIC.c',
          address: '0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313',
          logo: '/assets/logos/matic-token-icon.png',
        },
        collateral: [
          {
            name: 'USD Coin',
            symbol: 'USCD.c',
            address: '0xA485898266c91BcBBeF40F5d838423a751bb906d',
            logo: '/assets/logos/usd-coin-logo.png',
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
      // {
      //   name: 'USDC/WMATIC/WGK Pool',
      //   address: '0x53637c9dC575C66ce106F6e250c5e58E192DD5bD',
      //   asset: {
      //     name: 'USD Coin',
      //     symbol: 'USCD.c',
      //     address: '0xA485898266c91BcBBeF40F5d838423a751bb906d',
      //     logo: '/assets/logos/usd-coin-logo.png',
      //   },
      //   collateral: [
      //     {
      //       name: 'Wrapped MATIC',
      //       symbol: 'WMATIC.c',
      //       address: '0xe8C7867Ee32479cc7cD60DE28AB18b170cda9313',
      //       logo: '/assets/logos/matic-token-icon.png',
      //     },
      //     {
      //       name: 'Weird geek',
      //       symbol: 'WGK',
      //       address: '0x0',
      //       logo: '/assets/logos/wgk-logo.png',
      //     },
      //     {
      //       name: 'Chedda Fancy Eye',
      //       symbol: 'EYE',
      //       address: '0x0',
      //       logo: '/assets/logos/eye-logo.png',
      //     },
      //   ],
      //   stats: {},
      // },
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
      logo: '/assets/logos/matic-token-icon.png',
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
