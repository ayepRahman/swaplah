import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { HtmlHTMLAttributes } from "react";

type SwapCardProps = HtmlHTMLAttributes<HTMLDivElement> & {};

export function SwapCard({ className }: SwapCardProps) {
  return (
    <div
      className={cn(
        "border rounded-2xl shadow-2xl w-full max-w-[462px] p-4",
        className
      )}
    >
      <div className=" flex justify-between items-center">
        <div>Swap</div>

        <Settings />
      </div>
    </div>
  );
}
