import { load } from '@std/dotenv';
import type { QueryParams } from '../src/types.d.ts';
import LightspeedClient from '../src/lightspeed.ts';
import { getPrice, getQuantity } from '../mod.ts';

const env = await load();
const clientID = env.LIGHTSPEED_CLIENT_ID;
const clientSecret = env.LIGHTSPEED_CLIENT_SECRET;
const refreshToken = env.LIGHTSPEED_REFRESH_TOKEN;

// Setup a new lightspeed client and initialize it with the account ID
const ls = await LightspeedClient.create(clientID, clientSecret, refreshToken);

async function main() {
  /* 1. Get basic account information */
  const account = await ls.getAccountInformation();
  console.log('Account:', account);

  /* 2. Get all the categories */
  // const categories = await ls.getCategories();
  // console.log('Categories:', categories);

  /* 3. Get all the items */
  // const items = await ls.getItems();
  // console.log('Items:', items);

  /* 4. Get items with custom query parameters */
  // const options: QueryParams = {
  //   limit: '2',
  //   load_relations: '["Category", "ItemAttributes", "ItemShops"]',
  // };
  // const items = await ls.getItems(options);
  // console.log('Items:', items);

  /* 5. Get Items by Category */
  const categoryID = '116';
  const items = await ls.getItemsByCategory(categoryID);

  if (items !== null) {
    for (const item of items) {
      console.log('\nItem:', item.description);
      console.log(`Qty: ${getQuantity(item)} --- Price: ${getPrice(item)}\n`);
    }
  }
}

main();
