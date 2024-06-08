/**************************************/
// LIGHTSPEED API ENDPOINT RESOURCES //
/**************************************/

// https://developers.lightspeedhq.com/retail/endpoints/Account/
export interface Account {
  accountID: string;
  name: string;
  planID: string;
  timezone: string;
  catalogTime: string;
  currency: string;
  countryCode: string;
  type: string;
  resellerID?: string;
  createTime: string;
  timeStamp: string;
  Plans?: Plan[];
}
// https://developers.lightspeedhq.com/retail/endpoints/Category/
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
// https://developers.lightspeedhq.com/retail/endpoints/Customer/
export interface Customer {
  customerID: string;
  firstName: string;
  lastName: string;
  dob?: string;
  title?: string;
  company?: string;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  createTime: string;
  timeStamp: string;
  discountPercent?: string;
  archived: string;
  customerType?: string;
  contactID?: string;
  Addresses?: Address[];
  CreditAccounts?: CreditAccount[];
  Contact?: Contact;
  CustomFieldValues?: CustomFieldValue[];
  Note?: Note;
  TaxCategory?: TaxCategory;
  imageID?: string;
  Images?: Image[];
}
// https://developers.lightspeedhq.com/retail/endpoints/Item/
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
// https://developers.lightspeedhq.com/retail/endpoints/Quote/
export interface Quote {
  quoteID: string;
  customerID?: string;
  employeeID: string;
  shopID: string;
  registerID: string;
  createTime: string;
  timeStamp: string;
  completed: string;
  voided: string;
  status: string;
  subTotal: string;
  tax: string;
  total: string;
  note?: string;
  customerNote?: string;
  enablePromotions: string;
  QuoteLines?: QuoteLine[];
  Customer?: Customer;
  Employee?: Employee;
  Shop?: Shop;
  Register?: Register;
  TaxCategory?: TaxCategory;
}
// https://developers.lightspeedhq.com/retail/endpoints/Sale/
export interface Sale {
  saleID: string;
  employeeID: string;
  shopID: string;
  registerID: string;
  customerID?: string;
  quoteID?: string;
  createTime: string;
  timeStamp: string;
  completed: string;
  archived: string;
  voided: string;
  enablePromotions: string;
  receiptPreference?: string;
  subtotal: string;
  tax: string;
  total: string;
  balance: string;
  customerNotes?: string;
  note?: string;
  SalesLines?: SalesLine[];
  Payments?: Payment[];
  Customer?: Customer;
  Employee?: Employee;
  Shop?: Shop;
  Register?: Register;
  Quote?: Quote;
}

// Include other related interfaces (Customer, Employee, Shop, Register, Quote, Address, CreditAccount, Contact, CustomFieldValue, Note, TaxCategory, TaxRate, Item)

/*****************************/
// PRIVATE TYPES AND FIELDS //
/*****************************/

interface Address {
  addressID: string;
  customerID: string;
  type: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  contactID?: string;
  createTime: string;
  timeStamp: string;
}
interface CreditAccount {
  creditAccountID: string;
  customerID: string;
  storeCredit: string;
  createTime: string;
  timeStamp: string;
  archived: string;
}
interface Contact {
  contactID: string;
  prefix?: string;
  firstName: string;
  lastName: string;
  dob?: string;
  title?: string;
  company?: string;
  companyRegistrationNumber?: string;
  vatNumber?: string;
  createTime: string;
  timeStamp: string;
  email?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  website?: string;
  Addresses?: Address[];
}
interface CustomFieldValue {
  customFieldValueID: string;
  customFieldID: string;
  customerID: string;
  value: string;
}
interface Discount {
  discountID: string;
  name: string;
  discountAmount: string;
  discountPercent: string;
  archived: string;
  timeStamp: string;
}
interface Employee {
  employeeID: string;
  firstName: string;
  lastName: string;
  userName: string;
  timeStamp: string;
}
interface Image {
  imageID: string;
  publicID: string;
  src: string;
  createTime: string;
  timeStamp: string;
  sortOrder: string;
  width: string;
  height: string;
  url: string;
}
interface ItemPrice {
  amount: string;
  useType: string;
}
interface ItemShop {
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
interface Note {
  noteID: string;
  customerID: string;
  note: string;
  createTime: string;
  timeStamp: string;
}
interface QuoteLine {
  quoteLineID: string;
  quoteID: string;
  itemID: string;
  taxClassID: string;
  customerID?: string;
  discountID?: string;
  employeeID: string;
  shopID: string;
  registerID: string;
  createTime: string;
  timeStamp: string;
  unitQuantity: string;
  unitPrice: string;
  normalUnitPrice: string;
  discountAmount: string;
  tax: string;
  total: string;
  Comments?: string;
  Note?: string;
  Discount?: Discount;
  Item?: Item;
}
interface Register {
  registerID: string;
  name: string;
  timeStamp: string;
}
interface SalesLine {
  saleLineID: string;
  saleID: string;
  itemID: string;
  taxClassID: string;
  unitQuantity: string;
  unitPrice: string;
  normalUnitPrice: string;
  actualUnitPrice: string;
  discountAmount: string;
  tax: string;
  timestamp: string;
  Sale?: Sale;
  Item?: Item;
}
interface Shop {
  shopID: string;
  name: string;
  timeStamp: string;
}
interface TaxCategory {
  taxCategoryID: string;
  name: string;
  default: string;
  archived: string;
  TaxRates?: TaxRate[];
}
interface TaxRate {
  taxRateID: string;
  taxCategoryID: string;
  name: string;
  rate: string;
  default: string;
  createTime: string;
  timeStamp: string;
  archived: string;
}
interface Payment {
  paymentID: string;
  saleID: string;
  paymentTypeID: string;
  registerID: string;
  employeeID: string;
  createTime: string;
  amount: string;
  currency: string;
  paymentMethod?: string;
  changeDue: string;
  timestamp: string;
}
interface Plan {
  planID: string;
  name: string;
  interval: string;
  price: string;
  features: string;
}

/***********************/
// CUSTOM HELPER TYPES //
/***********************/

export interface LightspeedToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}
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
