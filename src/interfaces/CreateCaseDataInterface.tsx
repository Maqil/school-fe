export interface CreateCaseDataInterface {
  AccountId: string,
  ContactId: string,
  RecordType: string,
  IssueType: string;
  Subject: string,
  Description: string,
  Language: string,
  TrackingNumber: string,
  Attachment?: AttachementInterface,
}

export interface AttachementInterface {
  ContentType: string,
  Name: string,
  Body: string,
}