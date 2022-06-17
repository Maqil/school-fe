export interface MainCustomerDataInterface {
  Id: string;
  Name: string;
  Type: string;
  Phone: string;
  Fax: string;
  Website: string;
  BillingStreet: string;
  BillingCity: string;
  BillingState:  string;
  BillingPostalCode: string;
  BillingCountry: string;
  BillingStateCode:  string;
  BillingCountryCode:  string;
  Acct_ID:  string;
  SK_ID:  string;
  Account_Status:  string;
  RecordTypeId:  string;
}

export const defaultMainCustomerData = {
  Id: "",
  Name: "",
  Type: "",
  Phone: "",
  Fax: "",
  Website: "",
  BillingStreet: "",
  BillingCity: "",
  BillingState: "",
  BillingPostalCode:"",
  BillingCountry:"",
  BillingStateCode: "",
  BillingCountryCode: "",
  Acct_ID: "",
  SK_ID: "",
  Account_Status: "",
  RecordTypeId: ""
} as MainCustomerDataInterface;
