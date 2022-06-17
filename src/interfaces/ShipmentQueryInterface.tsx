export interface ShipmentQueryInterface {
  startDate: string;
  endDate: string;
  account: string;
  pageNumber: string;
  pageSize: string;
  airWaybill: string;
  packageReference: string;
  city: string;
  lastEventType: string;
}

export const defaultShipmentQuery = {
  startDate: "",
  endDate: "",
  account: "",
  pageNumber: "",
  pageSize: "",
  airWaybill: "",
  packageReference: "",
  city: "",
  lastEventType: ""
} as ShipmentQueryInterface;
