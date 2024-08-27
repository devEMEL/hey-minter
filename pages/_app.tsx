
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { Chain, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../state/store";

// import { publicProvider } from "wagmi/providers/public";
import { arbitrumSepolia, scrollSepolia } from "wagmi/chains";
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { useMemo } from 'react'
import type { Account, Chain, Client, Transport } from 'viem'
import { type Config, useClient, useConnectorClient } from 'wagmi'
import { FallbackProvider, JsonRpcProvider } from 'ethers'




export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    )
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }
  return new JsonRpcProvider(transport.url, network)
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const client = useClient<Config>({ chainId })
  return useMemo(() => (client ? clientToProvider(client) : undefined), [client])
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}

const openCampus = {
  id: 0xa045c,
  name: "openCampus",
  nativeCurrency: {
      decimals: 18,
      name: "EDU CHAIN",
      symbol: "EDU",
  },
  rpcUrls: {
      public: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
      default: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
  },
  blockExplorers: {
    default: {
      name: "openCampus",
      url: "https://opencampus-codex.blockscout.com"
    }
  },

  testnet: false,
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "NewzPay-Scroll",
  projectId: "cdddc2c45ee7a243f73916dfe293c0ca",
  chains: [openCampus],
  transports: {
    [openCampus.id]: http()
  }
});

const queryClient = new QueryClient();

// Create and export the App component wrapped with the RainbowKitProvider and WagmiConfig.
function App({ Component, pageProps }: AppProps) {


  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode={true}>
          <ToastContainer position={"top-center"} />
          <Layout>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
