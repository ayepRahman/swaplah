import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, safe, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected({
      target: "metaMask",
    }),
    walletConnect({ projectId }),
    safe(),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});
