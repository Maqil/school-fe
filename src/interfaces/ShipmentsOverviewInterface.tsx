export interface ShipmentsOverviewInterface {
  booked: number;
  accepted: number;
  inTransit: number;
  outForDelivery: number;
  deliveryAttempt: number;
  doorDelivered: number;
  missing: number;
  returnToShipper: number;
  startDate: string;
  endDate: string;
  initialDataLoadedFlag: boolean;
}

export const defaultShipmentOverview = {
  booked: 0,
  accepted: 0,
  inTransit: 0,
  outForDelivery: 0,
  deliveryAttempt: 0,
  doorDelivered: 0,
  missing: 0,
  returnToShipper: 0,
  startDate: "",
  endDate: "",
  initialDataLoadedFlag: false
} as ShipmentsOverviewInterface;
