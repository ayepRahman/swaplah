"use client";

import { useOptionalControlledState } from "@/hooks/useOptionalControlledState";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Settings } from "lucide-react";
import { ChangeEvent, HtmlHTMLAttributes, useCallback, useState } from "react";
import { Button } from "../ui/button";

type SwapCardProps = HtmlHTMLAttributes<HTMLDivElement> & {};

type TokenCardProps = HtmlHTMLAttributes<HTMLDivElement> & {
  title: string;
  value: string;
  onChange: (v: string) => void;
};

export function TokenCard({ title, value, onChange }: TokenCardProps) {
  const [_value, _setValue] = useOptionalControlledState({
    initialValue: "0",
    controlledValue: value,
    onChange,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow only numeric input
    if (/^[0-9]*$/.test(newValue)) {
      _setValue(newValue);
    }
  };

  return (
    <div className="border rounded-2xl p-4 w-full">
      <div className="text-xs text-muted-foreground ">{title}</div>
      <div className="flex items-center">
        <input
          placeholder="0"
          min={1}
          maxLength={79}
          spellCheck={false}
          value={_value}
          onChange={handleChange}
          type="text"
          className="my-2 appearance-none flex w-full rounded-md bg-background text-4xl ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <div className="">-</div>
        <div className="">
          Balance: <span>0.5</span>
        </div>
      </div>
    </div>
  );
}

export function SwapCard({ className }: SwapCardProps) {
  const [tokens, setTokens] = useState<{ value: string }[]>([
    { value: "0" },
    { value: "0" },
  ]);

  const tokenSender = tokens[0];
  const tokenReceiver = tokens[1];

  const handleOnChange = useCallback(
    (index: number, value: any) => {
      const newTokens = [...tokens];
      newTokens[index].value = value;
      setTokens(newTokens);
    },
    [tokens]
  );

  const handleSwitchTokens = useCallback(() => {
    setTokens([tokenReceiver, tokenSender]);
  }, [tokenReceiver, tokenSender]);

  return (
    <div
      className={cn(
        "border rounded-2xl shadow-custom w-full max-w-[462px]  p-4",
        className
      )}
    >
      <div className=" flex justify-between items-center">
        <div>Swap</div>
        <Settings
          className="cursor-pointer"
          onClick={() =>
            alert("Yo yo, cool thing is hapenning behind the scene!")
          }
        />
      </div>

      <div className="mt-4 space-y-2 relative">
        <Button
          onClick={() => handleSwitchTokens()}
          className="rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          size="icon"
          variant="outline"
        >
          <ArrowUpDown size="16" />
        </Button>
        <TokenCard
          value={tokenSender.value}
          onChange={(value) => handleOnChange(0, value)}
          title="You pay"
        />
        <TokenCard
          value={tokenReceiver.value}
          onChange={(value) => handleOnChange(0, value)}
          title="You receive"
        />
      </div>

      <Button className="mt-4 w-full rounded-xl " variant="secondary">
        Connect
      </Button>
    </div>
  );
}
