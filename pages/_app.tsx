
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";

import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { Chain, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../state/store";

import { publicProvider } from "wagmi/providers/public";
const Scroll_sepolia: Chain = {
  id: 534351,
  name: "Scroll Sepolia Testnet",
  network: "Scroll Sepolia Testnet",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "ETHEREUM",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://scroll-sepolia.blockpi.network/v1/rpc/public"] },
    default: { http: ["https://scroll-sepolia.blockpi.network/v1/rpc/public"] },
  },
  blockExplorers: {
    default: {
      name: "Scrollscan",
      url: "https://sepolia.scrollscan.com"
    }
  },

  testnet: true,
};
const { provider, chains } = configureChains([Scroll_sepolia], [publicProvider()]);


const { connectors } = getDefaultWallets({
  appName: "NewzPay-Scroll",
  projectId: "cdddc2c45ee7a243f73916dfe293c0ca",
  chains,
});

// Create the Wagmi client.
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Create and export the App component wrapped with the RainbowKitProvider and WagmiConfig.
function App({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode={true}>
        <ToastContainer position={"bottom-center"} />
        <Layout>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
