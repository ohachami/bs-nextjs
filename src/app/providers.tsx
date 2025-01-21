'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { SessionProvider /*signIn*/ } from 'next-auth/react';

export default function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  /* activate when ADFS is configured
    if(!session) {
        signIn('adfs').then((value) => console.log(value))
    }*/
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
