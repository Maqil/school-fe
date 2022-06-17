import React, { useEffect } from "react";
import { getI18n } from "react-i18next";
import {
  defaultCustomerData,
  CustomerDataInterface
} from "../interfaces/CustomerDataInterface";
import {
  defaultMainCustomerData,
  MainCustomerDataInterface
} from "../interfaces/MainCustomerDataInterface";
import { useApiError } from "./ApiErrorProvider";
import { useAuth } from "../providers/Auth";
import SignRequest from "../helpers/SignRequest";

const CustomerContext = React.createContext({
  loading: true,
  customerData: [defaultCustomerData],
  mainCustomerData: defaultMainCustomerData
});

export const CustomerProvider = props => {
  const [customerData, setCustomerData] = React.useState<
    CustomerDataInterface[]
  >([]);
  const [mainCustomerData, setMainCustomerData] = React.useState(
    defaultMainCustomerData
  );

  const [loading, setLoading] = React.useState(true);
  const [cognitoId, setcognitoId] = React.useState("");
  const { setErrorCode } = useApiError();
  const user = useAuth();

  useEffect(() => {
    // const getCustomerData = async user => {
    //   const subId = await user.getSubId();
    //   if (subId === cognitoId) {
    //     return;
    //   }
    //   setcognitoId(subId);

    //   if (!subId) {
    //     setLoading(false);
    //     setCustomerData([defaultCustomerData]);
    //     return;
    //   }
    //   setLoading(true);
    //   try {
    //     const body = {
    //       cognito_id: subId
    //     };

    //     //pass sub_id to api
    //     //GET /v1/cargo/profile/sls/?sk_id|cognito_id={id}
    //     // CALL: https://akamai-rivo-int.dbaas.aircanada.com/retrieve_customer_profile/admin
    //     const rawData = await SignRequest(
    //       "POST",
    //       process.env.REACT_APP_API_BASE,
    //       process.env.REACT_APP_AKAMAI_DBAAS_API_URL,
    //       "/retrieve_customer_profile/admin",
    //       body
    //     )
    //       .then(signedRequest => {
    //         return fetch(signedRequest.api, {
    //           method: "POST",
    //           headers: signedRequest.headers,
    //           body: signedRequest.data
    //         });
    //       })
    //       .then(response => response.json())
    //       .then(response => {
    //         return response;
    //       });

    //     if (!rawData) {
    //       setLoading(false);
    //       setCustomerData([]);
    //     }

    //     const data = getCustomerProfile(rawData, subId);

    //     setMainCustomerData({
    //       Id: rawData[0].Id,
    //       Name: rawData[0].Name,
    //       Type: rawData[0].Type,
    //       Phone: rawData[0].Phone,
    //       Fax: rawData[0].Fax,
    //       Website: rawData[0].Website,
    //       BillingStreet: rawData[0].BillingStreet,
    //       BillingCity: rawData[0].BillingCity,
    //       BillingState: rawData[0].BillingState,
    //       BillingPostalCode: rawData[0].BillingPostalCode,
    //       BillingStateCode: rawData[0].BillingStateCode,
    //       BillingCountryCode: rawData[0].BillingCountryCode,
    //       Acct_ID: rawData[0].Acct_ID,
    //       SK_ID: rawData[0].SK_IDs,
    //       Account_Status: rawData[0].Account_Status,
    //       RecordTypeId: rawData[0].RecordTypeId
    //     } as MainCustomerDataInterface);

    //     setCustomerData(data);
    //     setLoading(false);
    //   } catch (e: any) {
    //     if (e.response?.status) {
    //       setErrorCode(e.response?.status);
    //     }
    //     setLoading(false);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // getCustomerData(user);
  }, [cognitoId, user, setErrorCode]);

  const getCustomerProfile = (list, id) => {
    const newList: CustomerDataInterface[] = [];
    if (list?.length === 0) {
      return newList;
    }
    try {
      const contacts = list[0]["Contacts"].records.filter(
        c => c.Cognito_ID === id
      );
      newList.push({
        id: contacts[0].Id,
        emailId: contacts[0].Email,
        mobile: contacts[0].MobilePhone,
        firstName: contacts[0].FirstName,
        lastName: contacts[0].LastName,
        language: getI18n().resolvedLanguage,
        accountNumber: contacts[0].SK_IDs,
        mailingStreet: contacts[0].MailingStreet,
        mailingCity: contacts[0].MailingCity,
        mailingState: contacts[0].MailingState,
        mailingPostalCode: contacts[0].MailingPostalCode,
        mailingCountry: contacts[0].MailingCountry,
        contactId: contacts[0].Contact_ID,
        accountId: contacts[0].AccountId,
        recordTypeId: contacts[0].RecordTypeId
      } as CustomerDataInterface);
    } catch (e: any) {
      console.debug("ERROR: transformCustomerList exception ", e);
    }
    return newList;
  };

  return (
    <CustomerContext.Provider
      value={{
        loading,
        customerData,
        mainCustomerData
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = React.useContext(CustomerContext);
  return context;
};
