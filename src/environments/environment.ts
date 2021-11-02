// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  jsonRpc: {
    testnet: {
      iotex: 'https://babel-api.mainnet.iotex.io',
      harmony: 'https://api.s0.pops.one/',
      polygon: 'https://polygon-mumbai.g.alchemy.com/v2/-7eaLgpDD6dzJaDq2J2FlKM46uEzatAs',
      local: 'http://localhost:8545'
    }
  },
  contracts: {
    testnet: {
      Chedda: {
        iotex: '',
        harmony: '',
        polygon: ''
      },
      CheddaDappstore: {
        iotex: '',
        harmony: '',
        polygon: '0xE345C0A49C81B959CA602bFa66A4052776237E9f',
        local: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'
      },
      CheddaNFTMarket: {
        iotex: '',
        harmony: '',
        polygon: '0xE345C0A49C81B959CA602bFa66A4052776237E9f',
        local: '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B'
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
