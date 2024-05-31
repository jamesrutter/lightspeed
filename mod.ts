import { Account, Item, Category, QueryParams, LightspeedToken } from './types.d.ts';

class LightspeedClient {
  private clientID: string;
  private clientSecret: string;
  private accountID: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(clientID: string, clientSecret: string, refreshToken: string) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.accountID = '';
  }

  private async initializeClient() {
    await this.getAccessToken();
    await this.getAccountInformation();
  }

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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: LightspeedToken = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + data.expires_in * 1000; // Convert seconds to milliseconds
      return data;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  }

  private async getValidAccessToken(): Promise<string | null> {
    if (this.accessToken === null || this.tokenExpiry === null || Date.now() > this.tokenExpiry) {
      const lightspeedAuth = await this.getAccessToken();
      return lightspeedAuth?.access_token || null;
    } else {
      return this.accessToken;
    }
  }

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

  async getItems(options: QueryParams = {}): Promise<Item[] | null> {
    if (this.accountID === null) await this.getAccountInformation();
    if (this.accountID === null) return null;

    const accessToken = await this.getValidAccessToken();
    if (accessToken === null) return null;

    const defaultRelations = ['Category', 'ItemAttributes'];
    const relations = options.load_relations ? JSON.parse(options.load_relations) : defaultRelations;

    const params: QueryParams = {
      ...options,
      load_relations: JSON.stringify(relations),
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
      console.error('Error fetching items:', error);
      return null;
    }
  }
}

export default LightspeedClient;
