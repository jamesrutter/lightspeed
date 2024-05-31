import { load } from 'https://deno.land/std@0.224.0/dotenv/mod.ts';
import LightspeedClient from '../src/lightspeed.ts';
import { QueryParams } from '../types.d.ts';

// Load environment variables from .env file
const env = await load();
const clientID = env.CLIENT_ID;
const clientSecret = env.CLIENT_SECRET;
const refreshToken = env.REFRESH_TOKEN;

const ls = new LightspeedClient(clientID, clientSecret, refreshToken);

async function main() {
  const account = await ls.getAccountInformation();
  console.log('Account:', account);
  const categories = await ls.getCategories();
  console.log('Categories:', categories);

  const options: QueryParams = {
    limit: '2',
    load_relations: '["Category", "ItemAttributes"]',
  };
  const items = await ls.getItems(options);
  console.log('Items:', items);
}

main();
