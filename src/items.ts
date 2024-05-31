import type { Item } from './types.d.ts';

/**
 * Get the price of a Lightspeed Inventory Item
 * @param item - The Lightspeed Item object
 * @returns The price of the item returned as a string
 */
export function getPrice(item: Item): string {
  const prices = item.Prices.ItemPrice;
  const defaultPrice = prices.find((price) => price.useType === 'Default');
  if (defaultPrice) {
    return defaultPrice.amount;
  } else {
    return 'Not available';
  }
}
