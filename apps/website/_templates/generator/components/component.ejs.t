---
to: src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
import React, { HtmlHTMLAttributes } from 'react'
import { cn } from "@/lib/utils";

type <%= h.changeCase.pascal(name) %>Props = HtmlHTMLAttributes<HTMLDivElement> & {}

export function <%= h.changeCase.pascal(name) %>({ className, children }: <%= h.changeCase.pascal(name) %>Props) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  )
}


