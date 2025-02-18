'use client'

import SessionProvider from "@/components/SessionProvider"
import { HeroUIProvider } from "@heroui/react"

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </HeroUIProvider>
  )
}