export interface ShipmentDataInterface {
  airWaybill: string;
  issueDate: string;
  estimatedDeliveryDate: string;
  packageReference: string;
  shipperCity: string;
  consigneeCity: string;
  lastEventType: string;
}

export const defaultShipmentData = {
  airWaybill: "",
  issueDate: "",
  estimatedDeliveryDate: "",
  packageReference: "",
  shipperCity: "",
  consigneeCity: "",
  lastEventType: "",
} as ShipmentDataInterface;
