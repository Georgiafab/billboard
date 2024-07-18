import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { mainnet, polygonAmoy, polygon } from "wagmi/chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";

const appName = "一块广告牌";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, walletConnectWallet],
    },
  ],
  {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    appName,
  }
);

export const config = createConfig({
  connectors,
  chains: [process.env.NODE_ENV === "development" ? polygonAmoy : polygonAmoy],
  transports: {
    [polygon.id]: http(process.env.INFURA_URL),
    [polygonAmoy.id]: http(process.env.INFURA_URL),
  },
  multiInjectedProviderDiscovery: false,
  ssr: true,
});
