export interface CustomerDataInterface {
  id: string;
  emailId: string;
  mobile: string;
  firstName: string;
  lastName: string;
  language: string;
  accountNumber: string;
  mailingStreet: string;
  mailingCity: string;
  mailingState: string;
  mailingPostalCode: string;
  mailingCountry: string;
  contactId: string;
  accountId: string;
  recordTypeId: string;
}

export const defaultCustomerData = {
  id: "",
  emailId: "",
  mobile: "",
  firstName: "",
  lastName: "",
  language: "",
  accountNumber: "",
  mailingStreet: "",
  mailingCity: "",
  mailingState: "",
  mailingPostalCode: "",
  mailingCountry: "",
  contactId: "",
  accountId: "",
  recordTypeId: ""
} as CustomerDataInterface;
