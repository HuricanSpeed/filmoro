'use client'

import { SessionProvider as Provider } from "next-auth/react";
import { Session } from "next-auth";
import { useMemo } from "react";

export default function SessionProvider({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session?: Session | null;
}>) {
  const memoizedSession = useMemo(() => session, [session]);
  return <Provider session={memoizedSession}>{children}</Provider>;
}