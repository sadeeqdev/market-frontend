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
        polygon: '0xeE3d15Bd630E5Dd0eEE5eB321878cc19E4bB6CA6',
        local: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'
      },
      CheddaNFTMarket: {
        iotex: '',
        harmony: '',
        polygon: '0xE345C0A49C81B959CA602bFa66A4052776237E9f',
        local: '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B'
      }
    },
  },
  networks: {
    local: {
      addresses: {
        Chedda: '',
        CheddaDappStore: '0x73C68f1f41e4890D06Ba3e71b9E9DfA555f1fb46',
        CheddaDappMetrics: '0xD2D5e508C82EFc205cAFA4Ad969a4395Babce026',
        CheddaMarket: '0xdB012DD3E3345e2f8D23c0F3cbCb2D94f430Be8C',
        CheddaMarketExplorer: '0xd977422c9eE9B646f64A4C4389a6C98ad356d8C4'
      },
      params: {
        chainId: '80001',
        chainName: 'Hardhat',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['http://localhost:8545'],
        blockExplorerUrls: []
      }
    },
    harmony_one_mainnet_0: {
      addresses: {
        Chedda: '',
        CheddaDappStore: '',
        CheddaMarket: '0x851356ae760d987E095750cCeb3bC6014560891C',
        CheddamarketExplorer: '0xf5059a5D33d5853360D16C683c16e67980206f36'
      },
      params: {
        chainId: '80001',
        chainName: 'Polygon Mumbai Testnet',
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
      }
    },
    polygon_mainnnet: {
      addresses: {
        Chedda: '',
        CheddaDappStore: '',
        CheddaMarket: '',
      },
      params: {
        chainId: '80001',
        chainName: 'Polygon Mumbai Testnet',
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
      }
    },
    polygon_mumbai_testnet: {
      addresses: {
        Chedda: '',
        CheddaDappStore: '0xC674307d98625034C557907c7a628EffccFF1278',
        CheddaDappMetrics: '0x88e81dCdD8fdbEFfACa606e59e9d26876bfFb181',
        CheddaMarket: '0x1916022D451D4D6083bE60072c9CeD86E95C7e3b',
        CheddaMarketExplorer: '0xFCabEc24F9A3daE2fA8e3b34E82254ad42f1E9De'
      },
      params: {
        chainId: '80001',
        chainName: 'Polygon Mumbai Testnet',
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
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
