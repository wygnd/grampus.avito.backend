export const REDIS_KEYS = {
  prefix: {
    account: 'avito:account',
    profile: 'avito:account:profile',
    accessToken: 'avito:account:accessToken',
    user: 'avito:account:user',
    item: 'avito:account:item',
  } as const,
  account: {
    byID: (id: string | number): string => `${REDIS_KEYS.prefix.account}:${id}`,
    profile: (slug: string): string => `${REDIS_KEYS.prefix.account}:${slug}`,
    accessToken: (accountId: string) =>
      `${REDIS_KEYS.prefix.accessToken}:${accountId}`,
  },
  user: {
    byID: (id: string | number): string => `${REDIS_KEYS.prefix.user}:${id}`,
    byAccountID: (id: string | number): string =>
      `${REDIS_KEYS.prefix.user}:account_id:${id}`,
  },
  item: {
    byID: (id: string | number): string => `${REDIS_KEYS.prefix.item}:${id}`,
  },
};
