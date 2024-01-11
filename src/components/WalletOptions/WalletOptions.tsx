"use client";

import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { Connector } from "wagmi";
import { Button } from "../ui/button";

type ConnectWalletProps = HtmlHTMLAttributes<HTMLDivElement> & {};

export function WalletOptions({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick}>
      {connector.name}
    </Button>
  );
}
