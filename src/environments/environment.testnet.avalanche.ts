// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: "Avalanche C-Chain Testnet",
    jsonRpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
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
}
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  