import { createHash } from 'crypto';

export function hashString(payload: string): string {
  return createHash('sha256').update(payload).digest('hex');
}
