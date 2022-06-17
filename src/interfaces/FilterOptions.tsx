import { Status } from "../constants/status";

export interface FilterOptions {
    trackingNumber: string;
    orderNumber: string;
    destination: string;
    status: Status;
}