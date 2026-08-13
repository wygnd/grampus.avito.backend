export const REDIS_KEYS = {
  prefix: {
    account: 'avito:account',
    profile: 'avito:account:profile',
  } as const,
  account: {
    byID: (id: string | number): string => `${REDIS_KEYS.prefix.account}:${id}`,
    profile: (slug: string): string => `${REDIS_KEYS.prefix.account}:${slug}`,
  },
};
