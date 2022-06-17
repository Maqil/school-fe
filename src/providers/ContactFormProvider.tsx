import React, { useState, createContext } from "react";
import { useApiError } from "./ApiErrorProvider";
import { useCustomer } from "./CustomerProvider";
import { AttachementInterface, CreateCaseDataInterface } from "../interfaces/CreateCaseDataInterface";
import { getI18n } from "react-i18next";
import convertBase64 from "../helpers/ConvertBase64";
import SignRequest from "../helpers/SignRequest";
import { error } from "../constants/bindings";

const ContactFormContext = createContext({
  loading: false,
  submitFormValues: (submittedValues, file) => {}
});

export const ContactFormProvider = props => {

  const [loading, setLoading] = useState(false);
  const { setErrorCode } = useApiError();
  const { customerData } = useCustomer();

  const submitFormValues = async (submittedValues, file) => {
    let fileAttachement = {};
    if (file.length !== 0) {
      const base64File = await convertBase64(file);
      fileAttachement = {
        contentType: file.type,
        name: file.name,
        body: base64File
      };
    }

    try {
      const createCaseData = constructCreateCaseData(customerData, submittedValues, fileAttachement);

      setLoading(true);
      const data = await SignRequest(
        "POST",
        process.env.REACT_APP_API_BASE,
        process.env.REACT_APP_AKAMAI_DBAAS_API_URL,
        "/create_case/details",
        createCaseData
      )
        .then((signedRequest) => {
          return fetch(signedRequest.api, {
            method: "POST",
            headers: signedRequest.headers,
            body: signedRequest.data
          });
        })
        .then((response) => response.json())
        .then((response) => {
          return response;
        });

      if (data?.success){
        // sucess! return data
      } else if (data?.status.includes("ERROR")) {
        return ({
          status: "ERROR",
          message: data?.message
        });
      }
      return data;
    } catch (e: any) {
      if (e.response?.status) {
        setErrorCode(e.response?.status);
      } else {
        setErrorCode(error.CREATE_CASE);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactFormContext.Provider value={{ loading, submitFormValues }}>
      {props.children}
    </ContactFormContext.Provider>
  );
};

const constructCreateCaseData = (customerData, submittedValues: any, fileAttachement: any) => {

  let attachment: AttachementInterface = {
    ContentType: "",
    Name: "",
    Body: ""
  };

  // clean up attachment file
  if (Object.keys(fileAttachement).length !== 0 && fileAttachement.body.includes("base64,")) {
    const startIndex = fileAttachement.body.indexOf("base64,");
    const sanitizedFile = fileAttachement.body.slice(startIndex + 7);
    attachment = {
      ContentType: fileAttachement.contentType,
      Name: fileAttachement.name,
      Body: sanitizedFile
    }
  }

  // obtain the case report type id
  const caseReportTypeId = '' + process.env.REACT_APP_CASE_REPORT_TYPE_ID;

  // adjust description for case number issue type
  const description =
    (submittedValues.issueType === "Portal - e-Tailer: Follow-up on an existing case")
      ? "Case #: " +
        submittedValues.trackingNumber +
        " ; " +
        submittedValues.description
      : submittedValues.description;

  const data: CreateCaseDataInterface = {
    AccountId: customerData[0].accountId,
    ContactId: customerData[0].contactId,
    RecordType: caseReportTypeId,
    IssueType: submittedValues.issueType,
    Subject: "Question from Rivo Web Site Support page",
    Description: description,
    Language: getI18n().resolvedLanguage ===  "en" ? "English": "French",
    TrackingNumber: submittedValues.trackingNumber,
    Attachment: Object.keys(fileAttachement).length !== 0 ? attachment : undefined
  }
  return data;
}

export const useContactForm = () => {
  const context = React.useContext(ContactFormContext);
  return context;
};
