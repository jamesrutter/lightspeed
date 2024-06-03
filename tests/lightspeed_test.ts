import { assert, assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { LightspeedClient } from '../src/lightspeed.ts';
import type { Account } from '../src/types.d.ts';
import { load } from '@std/dotenv';

const env = await load();
const clientID = env.LIGHTSPEED_CLIENT_ID;
const clientSecret = env.LIGHTSPEED_CLIENT_SECRET;
const refreshToken = env.LIGHTSPEED_REFRESH_TOKEN;

Deno.test('LightspeedClient should fetch account information', async () => {
  const client = await LightspeedClient.create(clientID, clientSecret, refreshToken);
  const accountInfo = await client.getAccountInformation();
  assertEquals(accountInfo !== null, true);
  if (accountInfo) {
    assertEquals(typeof accountInfo.accountID, 'string');
    assertEquals(typeof accountInfo.name, 'string');
  }
});

Deno.test('LightspeedClient should fetch categories', async () => {
  const client = await LightspeedClient.create(clientID, clientSecret, refreshToken);
  const categories = await client.getCategories();
  assertEquals(categories !== null, true);
  if (categories) {
    assertEquals(Array.isArray(categories), true);
    assertEquals(categories.length > 0, true);
  }
});

Deno.test('LightspeedClient should fetch items', async () => {
  const client = await LightspeedClient.create(clientID, clientSecret, refreshToken);
  const items = await client.getItems();
  assertEquals(items !== null, true);
  if (items) {
    assertEquals(Array.isArray(items), true);
    assertEquals(items.length > 0, true);
  }
});
