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
  ItemShops?: {
    ItemShop: ItemShop[];
  };
}

export interface ItemShop {
  itemShopID: string;
  qoh: string;
  sellable: string;
  backorder: string;
  componentQoh: string;
  componentBackorder: string;
  reorderPoint: string;
  reorderLevel: string;
  timeStamp: string;
  itemID: string;
  shopID: string;
}

export interface Sale {
  saleID: string;
  timeStamp: string;
  discountPercent: string;
  completed: string;
  archived: string;
  voided: string;
  enablePromotions: string;
  isTaxInclusive: string;
  createTime: string;
  updatetime: string;
  completeTime: string;
  referenceNumber: string;
  referenceNumberSource: string;
  tax1Rate: string;
  tax2Rate: string;
  change: string;
  tipEnabled: string;
  receiptPreference: string;
  displayableSubtotal: string;
  ticketNumber: string;
  calcDiscount: string;
  calcTotal: string;
  calcSubtotal: string;
  calcTaxable: string;
  calcNonTaxable: string;
  calcAvgCost: string;
  calcFIFOCost: string;
  calcTax1: string;
  calcTax2: string;
  calcPayments: string;
  calcTips: string;
  total: string;
  totalDue: string;
  displayableTotal: string;
  balance: string;
  customerID: string;
  discountID: string;
  employeeID: string;
  tipEmployeeID: string;
  quoteID: string;
  registerID: string;
  shipToID: string;
  shopID: string;
  taxCategoryID: string;
  taxTotal: string;
}
