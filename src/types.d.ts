export interface QueryParams {
  after?: string;
  archived?: string;
  before?: string;
  count?: string;
  limit?: string;
  sort?: string;
  timeStamp?: string;
  load_relations?: string;
  [key: string]: string | undefined;
}

export interface LightspeedToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface Account {
  accountID: string;
  name: string;
}

export interface Category {
  categoryID: string;
  name: string;
  nodeDepth: string;
  fullPathName: string;
  leftNode: string;
  rightNode: string;
  parentID: string;
  createTime: string;
  timeStamp: string;
}

interface ItemPrice {
  amount: string;
  useType: string;
}

export interface Item {
  itemID: string;
  systemSku: string;
  defaultCost: string;
  avgCost: string;
  discountable: string;
  tax: string;
  archived: string;
  itemType: string;
  serialized: string;
  description: string;
  modelYear: string;
  upc: string;
  ean: string;
  customSku: string;
  manufacturerSku: string;
  createTime: string;
  timeStamp: string;
  publishToEcom: string;
  categoryID: string;
  taxClassID: string;
  departmentID: string;
  itemMatrixID: string;
  manufacturerID: string;
  seasonID: string;
  defaultVendorID: string;
  Prices: {
    ItemPrice: ItemPrice[];
  };
  Category?: Category;
}
