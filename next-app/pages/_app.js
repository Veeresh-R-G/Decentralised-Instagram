import { AppProvider } from '../context/context'
import '../styles/globals.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { ModalProvider } from 'react-modal-hook'
import '@rainbow-me/rainbowkit/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'


import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

// set up a configuration for multiple blockchain networks.
// in this case, we're using goerli and localhost

const { chains, provider } = configureChains(
  [chain.goerli, chain.localhost],
  [
    infuraProvider({ apiKey: process.env.INFURA_API_KEY, priority: 1 }),
    jsonRpcProvider({
      priority: 2,
      rpc: chain => ({
        http: `HTTP://127.0.0.1:7545`,
      }),
    }),
  ],
)

// set up a default wallet for each network
const { connectors } = getDefaultWallets({
  appName: 'Instagram',
  chains,
})

// create a wagmi client with the connectors and provider
const wagmiClient = createClient({
  
  autoConnect: true,

  // Connectors are used to connect to wallets
  connectors,

  // Provider is used to connect to the blockchain network
  provider,
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <ModalProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ModalProvider>
  )
}
export default MyApp
