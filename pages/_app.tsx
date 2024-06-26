import '../public/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';


import { config } from '../wagmi';
import { ConfigProvider } from 'antd';
import SideBar from '../components/SideBar';

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to the RainbowKit + SIWE example app',
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#726DF9',
          borderRadius: 2,
          colorBgContainer: '#F1F0FF',
        },
      }}
    >
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitSiweNextAuthProvider
              getSiweMessageOptions={getSiweMessageOptions}
            >
              <RainbowKitProvider modalSize="compact">
                <>
                  <SideBar></SideBar>
                  <Component {...pageProps} />
                </>
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </SessionProvider>
    </ConfigProvider>
  );
}