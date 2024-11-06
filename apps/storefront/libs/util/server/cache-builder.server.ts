import { Cache, CacheEntry, totalTtl } from '@epic-web/cachified';
import LRUCache from 'lru-cache';

export const buildNewLRUCache = ({ max }: { max: number }) => {
  const lruInstance = new LRUCache<string, CacheEntry>({ max });
  const lru: Cache = {
    set(key, value) {
      const ttl = totalTtl(value?.metadata);
      return lruInstance.set(key, value, {
        ttl: ttl === Infinity ? undefined : ttl,
        start: value?.metadata?.createdTime,
      });
    },
    get(key) {
      return lruInstance.get(key);
    },
    delete(key) {
      return lruInstance.delete(key);
    },
  };

  return lru;
};

export const MILLIS = {
  TEN_SECONDS: 10_000,
  ONE_MINUTE: 60_000,
  FIVE_MINUTES: 300_000,
  ONE_HOUR: 3_600_000,
};
