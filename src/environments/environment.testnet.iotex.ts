// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: "IoTeX Testnet",
    jsonRpcUrl: 'https://babel-api.testnet.iotex.io',
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
}
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  