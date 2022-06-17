import { CombineComponents } from "../../utils/CombineComponents";

import { CustomerProvider } from "../../providers/CustomerProvider";
import { ShipmentsProvider } from "../../providers/ShipmentsProvider";
import { TrackingProvider } from "../../providers/TrackingProvider";

const providers = [
  CustomerProvider,
  ShipmentsProvider,
  TrackingProvider
];

export const AppContextProvider = CombineComponents(...providers);
