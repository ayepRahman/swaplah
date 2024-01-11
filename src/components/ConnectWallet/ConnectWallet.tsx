"use client";

import { truncate } from "@/utils/strings";
import { Power } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { WalletOptions } from "../WalletOptions";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function ConnectWallet() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { connectors, connect } = useConnect();

  console.log({
    ensName,
    ensAvatar,
  });

  if (!isConnected) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Connect</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[362px] w-full">
          <DialogTitle>Connect a wallet</DialogTitle>
          <div className="space-y-2 flex flex-col ">
            {connectors.map((connector) => {
              return (
                <WalletOptions
                  key={connector.uid}
                  connector={connector}
                  onClick={() => connect({ connector })}
                />
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div>
      <Image
        onClick={() => setIsOpen(true)}
        className="rounded-full shadow-2xl cursor-pointer"
        height={32}
        width={32}
        alt="ENS Avatar"
        src={ensAvatar || "/image/gorifun.webp"}
      />

      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent className="max-w-[362px] w-full overflow-hidden">
          <div>
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full shadow-2xl cursor-pointer"
                height={32}
                width={32}
                alt="ENS Avatar"
                src={ensAvatar || "/image/gorifun.webp"}
              />

              {address && (
                <div className=" truncate">
                  {ensName
                    ? `${ensName} (${truncate(address)})`
                    : truncate(address)}
                </div>
              )}
            </div>
            <Button
              onClick={() => disconnect()}
              className="mt-4 w-full flex items-center gap-2"
            >
              <span>Disconnect</span>
              <Power size={16} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
