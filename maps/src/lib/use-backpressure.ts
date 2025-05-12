'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';

export function useBackpressure() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [shouldSuspend, setShouldSuspend] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function triggerUpdate(url: string) {
    setShouldSuspend(true);
    
    startTransition(() => {
      router.push(url);
      setShouldSuspend(false);
    });
  }

  return {
    triggerUpdate,
    shouldSuspend,
    isPending,
    formRef,
  };
}