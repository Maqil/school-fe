import { Status } from "../constants/status";
import { FilterOptions } from "./FilterOptions";

export interface FilterContainerProps {
    onApply: (options: FilterOptions) => void;
    trackingNumber: string;
    orderNumber: string;
    origin: string;
    destination: string;
    status: Status;
  }