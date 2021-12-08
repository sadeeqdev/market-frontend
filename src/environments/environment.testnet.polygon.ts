// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: "Polygon Mumbai Testnet",
    jsonRpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/-7eaLgpDD6dzJaDq2J2FlKM46uEzatAs',
    config: {
        contracts: {
            CheddaAddressRegistry: '0x8227d35a95a44dE78c2296Bb7557e106E9b0aF9f',
            CheddaXP: '0xD74913265E74F6B56FE80d18aF5ef42575c226af',
            CheddaDappStore: '0x942940777Bd572789d72C8EcfA41f211F290167C',
            CheddaDappExplorer: '0x3600cAB0053eB1Cc76fF3dF73f47130dC391eD2B',
            CheddaMarket: '0xEDFa988f9498165fE79f09dA9e39f9dC829507D7',
            CheddaMarketExplorer: '0x410236c7e9763891A90EE41C47826246348963dA',
            CheddaRewards: '0xa3953E0C2C69137EF2e83A78f77E95CAeb14BAA9',
          },
          networkParams: {
            chainId: '0x13881',
            chainName: 'Polygon Mumbai Testnet',
            nativeCurrency: {
                name: 'Matic',
                symbol: 'MATIC',
                decimals: 18,
                image: ''
            },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/']
          },
          faucets: [
            {
              name: 'Polygon Mumbai Faucet',
              icon: '',
              url: '',
            }
          ],
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
  