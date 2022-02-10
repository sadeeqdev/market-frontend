// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: "Oasis Emerald Testnet",
    jsonRpcUrl: 'https://testnet.emerald.oasis.dev',
    config: {
        contracts: {
            CheddaAddressRegistry: '0x9e76C61A9f7Db397Db9f063B0762b3996b30C66B',
            CheddaXP: '0x05E2921659D7C30d4a9ed1073adF20C9F51547b7',
            CheddaDappStore: '0x1B08A8c19981e9D49632365cB20f23013a5f0095',
            CheddaDappExplorer: '0x54f1419Cef425d6f32201A952c4cAAcBa906D10A',
            CheddaMarket: '0x77E3A4e86CDBDDD506cA19a765456B3ed939e718',
            CheddaMarketExplorer: '0x46e70bd04b9251D4cC253978944726b91A837AD9',
            CheddaRewards: '0x235d01856E4F75e0fb5CC90571E5B4eF7FB6Af12',
            CheddaDropManager: '0x187BfAd085926113c3918a599c7898219285e3bb',
            CheddaLoanManager: '0x1f9Caf0c5BF82C07d05A3D14ce760f8adD612463',
            ChainlinkPriceConsumer: '',
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
          faucets: [
            {
              name: 'Rose Testnet Faucet',
              logo: '',
              url: '',
            }
          ],
          ui: {
            chainName: 'Oasis',
            logo: '/assets/logos/oasis-logo-sm.png',
            txUrlPrefix: 'https://testnet.explorer.emerald.oasis.dev/txs/'
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
  