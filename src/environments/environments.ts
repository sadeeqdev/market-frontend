export const environments = [
    {
        production: false,
        environmentName: 'Polygon Mumbai Testnet',
        identifier: "Polygon",
        jsonRpcUrl:
          'https://polygon-mumbai.infura.io/v3/d674ad7889a4404c960e18610cf74a3a',
        webSocketUrl: 'wss://polygon-mumbai.g.alchemy.com/v2/-7eaLgpDD6dzJaDq2J2FlKM46uEzatAs',
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
    },
    {
      production: false,
      environmentName: "Oasis Emerald Testnet",
      identifier: "Oasis",
      jsonRpcUrl: 'https://testnet.emerald.oasis.dev',
      webSocketUrl: 'wss://testnet.emerald.oasis.dev/ws',
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
                  logo: '/assets/logos/usdc-logo.png'
                },
                collateral: [
                  {
                    name: 'Wrapped ROSE',
                    symbol: 'WROSE.c',
                    address: '0xb19B3D29931549c4EFE24bC5aC6DCf11f7a33A21',
                    logo: '/assets/logos/wrose-logo.png'
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
                    logo: '/assets/logos/wrose-logo.png'
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
                    logo: '/assets/logos/wrose-logo.png'
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
                  logo: '/assets/logos/wrose-logo.png'
                },
                collateral: [
                  {
                    name: 'USD Coin',
                    symbol: 'USCD.c',
                    address: '0x8457106E861a67B989a2ea398DF3A045331E5115',
                    logo: '/assets/logos/usdc-logo.png'
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
                  logo: '/assets/logos/wrose-logo.png'
                },
                collateral: [
                  {
                    name: 'Chedda',
                    symbol: 'CHEDDA',
                    address: '0x89658069fc4b3e528F651405c9d71583eB9D2344',
                    logo: '/assets/logos/chedda-3d-logo.png'
                  },
                  {
                    name: 'Valley Swap',
                    symbol: 'VS',
                    address: '0xB0A47be6707E3122F1CF4C2259897E6e97380E1A',
                    logo: '/assets/logos/swap-logo.png'
                  },
                  {
                    name: 'YUZUSwap',
                    symbol: 'YUZU',
                    address: '0xA2cfE619cDd3bc1F051890Cea945CC145a45770B',
                    logo: '/assets/logos/yuzu-logo.png'
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
              logo: '/assets/logos/wrose-logo.png',
              txUrlPrefix: 'https://testnet.explorer.emerald.oasis.dev/txs/'
            }
      },
    },
    {
        production: false,
        environmentName: "Telos EVM Testnet",
        identifier: "Telos",
        jsonRpcUrl: 'https://testnet.telos.net/evm',
        webSocketUrl: '',
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
    },
    {
        production: false,
        environmentName: "IoTeX Testnet",
        identifier:'Iotex',
        jsonRpcUrl: 'https://babel-api.testnet.iotex.io',
        webSocketUrl: '',
        config: {
            contracts: {
                CheddaAddressRegistry: '0xc349d33292F4958d5E616035241bE2ab2dE85100',
                CheddaXP: '0xFe09e4d727Eda07D5C0e961EbE04c7c0f0B0C2C6',
                CheddaDappStore: '0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b',
                CheddaDappExplorer: '0x8166D0DeFb96900075a667FFb099DE8A493A4DfD',
                CheddaMarket: '0x2e4BC6d9614D8803613c96cFD3c71ACfC596aF78',
                CheddaMarketExplorer: '0x99759489e8F7f42a72204f1e516Fab7ea39B8e42',
                CheddaRewards: '0x92a3031304B3897A01592E42e76E00Aa4d0dc758',
                CheddaDropManager: '0x4b6eE186119f027e0047b6B772e31fB20B3aa1d1',
                CheddaLoanManager: '0x25f75DB04BA7834C396e609E4e8a4782a796D345',
                ChainlinkPriceConsumer: '',
              },
              networkParams: {
                chainId: '0x1252',
                chainName: 'IoTeX Testnet',
                nativeCurrency: {
                    name: 'IoTeX',
                    symbol: 'IOTX',
                    decimals: 18,
                    image: ''
                },
                rpcUrls: ['https://babel-api.testnet.iotex.io'],
                blockExplorerUrls: ['https://testnet.iotexscan.io/']
              },
              faucets: [
                {
                  name: 'IoTeX Testnet Faucet',
                  logo: '',
                  url: 'https://faucet.iotex.io/',
                }
              ],
              ui: {
                chainName: 'IoTeX',
                logo: '/assets/logos/iotex-logo.png',
                txUrlPrefix: 'https://testnet.iotexscan.io/tx/'
              }
        },
    },
    {
        production: false,
        environmentName: "Harmony ONE Testnet",
        identifier:'Harmony',
        jsonRpcUrl: 'https://api.s0.b.hmny.io',
        webSocketUrl: '',
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
                    logo: '/assets/logos/usdc-logo.png'
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
                      logo: '/assets/logos/usdc-logo.png'
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
    },
    {
        production: false,
        environmentName: "Avalanche C-Chain Testnet",
        identifier:'Avalanche',
        jsonRpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
        webSocketUrl: '',
        config: {
            contracts: {
                CheddaAddressRegistry: '0x8166D0DeFb96900075a667FFb099DE8A493A4DfD',
                CheddaXP: '0xA08b56a5087bEcEf5F32DB4751D34135e970C1F4',
                CheddaDappStore: '0xeC7D6a60d7367681e42b1c153d38cBCde55f786D',
                CheddaDappExplorer: '0x3c7A70737Bdee3d538931D6b4E3C05f25bF609F4',
                CheddaMarket: '0xaEea70F81C41A2Af80DE86467eeBB51A2DAB6fb3',
                CheddaMarketExplorer: '0x513a37DfC7D17Bb285FF771D9b60853c55aD0C65',
                CheddaRewards: '0xE345C0A49C81B959CA602bFa66A4052776237E9f',
                CheddaDropManager: '0x70381A1c4bc75b9E9defDe8Dc1E291880e44F73b',
                CheddaLoanManager: '0x2808a47dca28f46D85210Bcd56B585446d1482be',
                ChainlinkPriceConsumer: '0x674036Df4BdbCB9bD6D5F83d6daA340f190a5DCC',
                CheddaBaseTokenVault: '0xfdFfc461476CEd890dC62830969E6Eba1048A99D',
                Chedda: '0x30c54E9c99147620BD6fBC2D9b0CE90b4FBc80eF',
                xChedda: '0x0fFD5fB4B3160A2709E120A7484AEE03500c55b3',
                USDC: '0x55df0aF74eE7FA170AbBF7eb3F8D43d7c20De207',
                WrappedNative: '0x2c01212f051A59D88A1361db1E2041896dB4af64',
                Faucet: '0xF9BF842eA45AfBa3cd3A1aED2aA5a3ACE07B9DF4',
              },
              networkParams: {
                chainId: '0xA869',
                chainName: 'Avalanche Testnet C-Chain',
                nativeCurrency: {
                    name: 'Avalanche',
                    symbol: 'AVAX',
                    decimals: 18
                },
                rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
                blockExplorerUrls: ['https://testnet.snowtrace.io/']
              },
              pools: [
                {
                  name: 'USDC/WAVAX Pool',
                  address: '0xfdFfc461476CEd890dC62830969E6Eba1048A99D',
                  asset: {
                    name: 'USD Coin',
                    symbol: 'USCD.c',
                    address: '0x55df0aF74eE7FA170AbBF7eb3F8D43d7c20De207',
                    logo: '/assets/logos/usd-logo.png'
                  },
                  collateral: [
                    {
                      name: 'Wrapped AVAX',
                      symbol: 'WAVAX.c',
                      address: '0x2c01212f051A59D88A1361db1E2041896dB4af64',
                      logo: '/assets/logos/avalanche-avax-logo.png'
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
                  name: 'Avalanche Testnet Faucet',
                  logo: '',
                  url: 'https://faucet.avax-test.network/',
                }
              ],
              ui: {
                chainName: 'Avalanche',
                logo: '/assets/logos/avalanche-avax-logo.png',
                txUrlPrefix: 'https://testnet.snowtrace.io/tx/'
              }
        },
    },
    {
        production: false,
        environmentName: 'Hardhat Network', 
        identifier:'Hardhat',
        jsonRpcUrl: 'http://localhost:8545',
        webSocketUrl: '',
        config: {
            contracts: {
                CheddaAddressRegistry: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
                CheddaXP: '0x9A676e781A523b5d0C0e43731313A708CB607508',
                CheddaDappStore: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
                CheddaDappExplorer: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
                CheddaMarket: '0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E',
                CheddaMarketExplorer: '0x9E545E3C0baAB3E08CdfD552C960A1050f373042',
                CheddaRewards: '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
                CheddaDropManager: '',
                CheddaLoanManager: '',
              },
              networkParams: {
                chainId: '0x7a69',
                chainName: 'Hardhat Testnet',
                nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18
                },
                rpcUrls: ['http://localhost:8545'],
                blockExplorerUrls: [],
              },
              faucets: [],
              ui: {
                chainName: 'Hardhat',
                logo: '/assets/logos/harmony-logo.png',
                txUrlPrefix: 'http://localhost:8545/tx/'
            }
        },
    }
  ]