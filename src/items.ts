import type { Item } from './types.d.ts';

/**
 * Get the price of a Lightspeed Inventory Item
 * @param {Item} item - The Lightspeed Item object
 * @returns {string} The price of the item returned as a string
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

/**
 * Get the quantity of a Lightspeed Inventory Item
 * @param {Item} item - The Lightspeed Item object
 * @returns {string} - The quantity of the item returned as a string
 */
export function getQuantity(item: Item): string {
  const shopID = '0'; // shopID == 0 is the total quantity of the item (summed across all shops)
  const itemShop = item.ItemShops?.ItemShop.find((shop) => shop.shopID === shopID);

  if (itemShop) {
    return itemShop.qoh;
  } else {
    return 'Not available';
  }
}
