"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo-client";
import { ReactNode, useEffect } from "react";
import PostHogPageView from "./PostHogPageView";
import WalletProvider from "@/components/payment/WalletProvider";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!posthogKey) {
      console.error(
        "PostHog key is missing. Please set NEXT_PUBLIC_POSTHOG_KEY in your environment variables."
      );
      return;
    }

    posthog.init(posthogKey, {
      api_host: posthogHost || "https://app.posthog.com", // Fallback to default if undefined
      capture_pageview: true,
      capture_pageleave: true,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      <ApolloProvider client={apolloClient}>
        <WalletProvider>{children}</WalletProvider>
      </ApolloProvider>
    </PHProvider>
  );
}
