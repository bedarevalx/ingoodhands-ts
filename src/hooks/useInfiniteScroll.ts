import React, { useCallback, useRef, useState } from 'react';
import { IAdPreview } from '../interfaces/ads.interfaces';
export interface UseInfiniteScroll {
  loadMoreCallback: (el: HTMLDivElement) => void;
}

export const useInfiniteScroll = (
  loadFunc: () => void,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  isLastPage: boolean,
  items: IAdPreview[],
  page: number,
): UseInfiniteScroll => {
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && !isLastPage) {
        setIsLoading(true);
        clearTimeout(loadMoreTimeoutRef.current);
        loadMoreTimeoutRef.current = setTimeout(() => {
          loadFunc();
        }, 500);
      }
    },
    [loadMoreTimeoutRef, setIsLoading, page, items],
  );

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };
      observerRef.current = new IntersectionObserver(handleObserver, option);

      if (el) observerRef.current.observe(el);
    },
    [handleObserver, isLoading],
  );

  return {
    loadMoreCallback,
  };
};
