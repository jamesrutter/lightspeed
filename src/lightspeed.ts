import type { Account, Item, Category, QueryParams, LightspeedToken } from './types.d.ts';
import { LightspeedError, LightspeedAuthError } from './errors.ts';

/**
 * LightspeedClient class to interact with Lightspeed API.
 */
export class LightspeedClient {
  private clientID: string;
  private clientSecret: string;
  private accountID: string | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number | null = null;

  /**
   * Creates an instance of LightspeedClient.
   * @param {string} clientID - The client ID for the Lightspeed API.
   * @param {string} clientSecret - The client secret for the Lightspeed API.
   * @param {string} refreshToken - The refresh token for the Lightspeed API.
   */
  constructor(clientID: string, clientSecret: string, refreshToken: string) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
  }

  /**
   * Creates and initializes an instance of LightspeedClient.
   * @param {string} clientID - The client ID for the Lightspeed API.
   * @param {string} clientSecret - The client secret for the Lightspeed API.
   * @param {string} refreshToken - The refresh token for the Lightspeed API.
   * @returns {Promise<LightspeedClient>} An initialized instance of LightspeedClient.
   */
  static async create(clientID: string, clientSecret: string, refreshToken: string): Promise<LightspeedClient> {
    const client = new LightspeedClient(clientID, clientSecret, refreshToken);
    await client.initialize();
    console.log('client:', client);
    return client;
  }

  /**
   * Initializes the LightspeedClient instance by fetching the account ID.
   * @returns {Promise<void>}
   */

  private async initialize(): Promise<void> {
    this.accountID = await this.getAccountID();
  }

  /**
   * Retrieves an access token from the Lightspeed API.
   * @returns {Promise<LightspeedToken | null>} The access token data or null if the request fails.
   */
  private async getAccessToken(): Promise<LightspeedToken | null> {
    const tokenUrl = 'https://cloud.lightspeedapp.com/oauth/access_token.php';
    const payload = {
      refresh_token: this.refreshToken,
      client_id: this.clientID,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
    };

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new LightspeedAuthError(`HTTP error! Status: ${response.status} - ${response.statusText}`);

      const data: LightspeedToken = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + data.expires_in * 1000 - 30000; // 30 seconds before expiry
      return data;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  }

  /**
   * Retrieves a valid access token, either by refreshing the current token or getting a new one.
   * @returns {Promise<string | null>} The valid access token or null if the request fails.
   */
  private async getValidAccessToken(): Promise<string | null> {
    if (this.accessToken === null || this.tokenExpiry === null || Date.now() > this.tokenExpiry) {
      const lightspeedAuth = await this.getAccessToken();
      return lightspeedAuth?.access_token || null;
    } else {
      return this.accessToken;
    }
  }

  /**
   * Retrieves account information from the Lightspeed API.
   * @returns {Promise<Account | null>} The account information or null if the request fails.
   */
  async getAccountInformation(): Promise<Account | null> {
    const accountUrl = 'https://api.lightspeedapp.com/API/V3/Account.json';
    const accessToken = await this.getValidAccessToken();

    if (accessToken === null) {
      return null;
    }

    try {
      const response = await fetch(accountUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const account: Account = {
        accountID: data.Account.accountID,
        name: data.Account.name,
      };
      this.accountID = account.accountID;
      return account;
    } catch (error) {
      console.error('Error fetching account information:', error);
      return null;
    }
  }

  /**
   * Retrieves account ID from the Lightspeed API.
   * @returns {Promise<string | null>} The account ID or null if the request fails.
   */
  async getAccountID(): Promise<string | null> {
    const accountUrl = 'https://api.lightspeedapp.com/API/V3/Account.json';
    const accessToken = await this.getValidAccessToken();

    if (accessToken === null) return null;

    try {
      const response = await fetch(accountUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      return data.Account.accountID;
    } catch (error) {
      console.error('Error fetching account information:', error);
      return null;
    }
  }

  /**
   * Retrieves categories from the Lightspeed API.
   * @returns {Promise<Category[] | null>} The categories or null if the request fails.
   */
  async getCategories(): Promise<Category[] | null> {
    if (this.accountID === null) {
      await this.getAccountInformation();
    }

    if (this.accountID === null) {
      return null;
    }

    const categoriesUrl = `https://api.lightspeedapp.com/API/V3/Account/${this.accountID}/Category.json`;
    const accessToken = await this.getValidAccessToken();

    if (accessToken === null) {
      return null;
    }

    try {
      const response = await fetch(categoriesUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.Category as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return null;
    }
  }

  /**
   * Retrieves items from the Lightspeed API.
   * @param {QueryParams} [options={}] - The query parameters for the request.
   * @ {Promise<Item[] | null>} The items or null if the request fails.
   *
   * @example
   * ```ts
   * const ls = await LightspeedClient.create(clientID, clientSecret, refreshToken);
   * const items = await ls.getItems(); // get all items
   * console.log('Items:', items);
   *
   * const options: QueryParams = {
   * const options = {
   *   limit: 10,
   *   sort: '-timeStamp',
   * };
   * const items = await ls.getItems(options); // get 10 most recent items
   * console.log('Items:', items);
   * ```
   *
   */
  async getItems(options: QueryParams = {}): Promise<Item[] | null> {
    if (this.accountID === null) await this.getAccountInformation();
    if (this.accountID === null) return null;

    const accessToken = await this.getValidAccessToken();
    if (accessToken === null) return null;

    const defaultRelations = ['Category', 'ItemAttributes', 'ItemShops'];
    const relations = options.load_relations ? JSON.parse(options.load_relations) : defaultRelations;

    const params: QueryParams = {
      ...options,
      load_relations: JSON.stringify(relations),
    };

    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const itemsUrl = `https://api.lightspeedapp.com/API/V3/Account/${this.accountID}/Item.json?${queryString}`;
    console.log(itemsUrl);
    try {
      const response = await fetch(itemsUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.Item as Item[];
    } catch (error) {
      console.error('Error fetching items:', error);
      return null;
    }
  }

  /**
   * Retrieves an item by ID from the Lightspeed API.
   * @param {string} itemID - The item ID.
   * @returns {Promise<Item | null>} The item or null if the request fails.
   */
  async getItemByID(itemID: string): Promise<Item | null> {
    if (this.accountID === null) await this.getAccountInformation();
    if (this.accountID === null) return null;

    const accessToken = await this.getValidAccessToken();
    if (accessToken === null) return null;

    const itemUrl = `https://api.lightspeedapp.com/API/V3/Account/${this.accountID}/Item/${itemID}.json`;
    try {
      const response = await fetch(itemUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.Item as Item;
    } catch (error) {
      console.error('Error fetching item:', error);
      return null;
    }
  }

  /**
   *  Retrieves items by category from the Lightspeed API.
   * @param {string} categoryID - The category ID.
   * @param {QueryParams} [options={}] - The query parameters for the request.
   * @returns {Promise<Item[] | null>} The items or null if the request fails.
   * @example
   * ```ts
   * const ls = await LightspeedClient.create(clientID, clientSecret, refreshToken);
   * const categoryID = '116';
   * const items = await ls.getItemsByCategory(categoryID);
   * console.log('Items:', items);
   * ```
   */
  async getItemsByCategory(categoryID: string, options: QueryParams = {}): Promise<Item[] | null> {
    if (this.accountID === null) await this.getAccountInformation();
    if (this.accountID === null) return null;

    const accessToken = await this.getValidAccessToken();
    if (accessToken === null) return null;

    const defaultRelations = ['Category', 'ItemAttributes', 'ItemShops'];
    const relations = options.load_relations ? JSON.parse(options.load_relations) : defaultRelations;

    const params: QueryParams = {
      ...options,
      load_relations: JSON.stringify(relations),
      'Category.categoryID': categoryID,
    };

    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    console.log('queryString:', queryString);
    const itemsUrl = `https://api.lightspeedapp.com/API/V3/Account/${this.accountID}/Item.json?${queryString}`;
    console.log('itemsUrl:', itemsUrl);

    try {
      const response = await fetch(itemsUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.Item as Item[];
    } catch (error) {
      console.error('Error fetching items by category:', error);
      return null;
    }
  }
}

export default LightspeedClient;
