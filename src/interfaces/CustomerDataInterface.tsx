export interface CustomerDataInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  beautifyRoleName: string;
}

export const defaultCustomerData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  username: "",
  beautifyRoleName: ""
} as CustomerDataInterface;
