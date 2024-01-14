import { cn } from "@/lib/utils";
import { BoxIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { HtmlHTMLAttributes } from "react";
import { ConnectWallet } from "../ConnectWallet";
import { ModeToggle } from "../ModeToggle";

type NavbarProps = HtmlHTMLAttributes<HTMLDivElement> & {};

export function Navbar({ className }: NavbarProps) {
  return (
    <div
      className={cn(
        "w-full container mx-auto flex items-center justify-between py-4",
        className
      )}
    >
      <Link href="/">
        <BoxIcon />
      </Link>

      <div className="flex items-center gap-4">
        <ConnectWallet />
        <ModeToggle />
      </div>
    </div>
  );
}
