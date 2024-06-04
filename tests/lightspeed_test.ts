// import { load } from '@std/dotenv';
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { LightspeedClient } from '../src/lightspeed.ts';

const clientID = Deno.env.get('LIGHTSPEED_CLIENT_ID')!;
const clientSecret = Deno.env.get('LIGHTSPEED_CLIENT_SECRET')!;
const refreshToken = Deno.env.get('LIGHTSPEED_REFRESH_TOKEN')!;

console.log(clientID, clientSecret, refreshToken);

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

Deno.test('LightspeedClient should fetch recent sales', async () => {
  const client = await LightspeedClient.create(clientID, clientSecret, refreshToken);
  const recentSales = await client.getRecentSales();
  console.log(recentSales);
  assertEquals(recentSales !== null, true);
  if (recentSales) {
    assertEquals(Array.isArray(recentSales), true);
    assertEquals(recentSales.length > 0, true);
  }
});
