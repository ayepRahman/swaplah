"use client";

import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";

type NetworkNotificationProps = HtmlHTMLAttributes<HTMLDivElement> & {};

export function NetworkNotification({
  className,
  children,
}: NetworkNotificationProps) {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  console.log("chain", chain);

  if (!chain || chain?.id !== 11155111)
    return (
      <div
        className={cn("w-full flex justify-center border-b py-4", className)}
      >
        <div
          onClick={() => switchChain({ chainId: sepolia.id })}
          className="text-xs underline cursor-pointer"
        >
          Please switch to the Sepolia network.
        </div>
      </div>
    );

  return (
    <div className={cn("w-full flex justify-center border-b py-4", className)}>
      <div className="text-xs">
        Connected to <span className="font-semibold">{chain?.name}</span> test
        network
      </div>
    </div>
  );
}
