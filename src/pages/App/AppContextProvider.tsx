import { CombineComponents } from "../../utils/CombineComponents";

import { CustomerProvider } from "../../providers/CustomerProvider";
import { ShipmentsProvider } from "../../providers/ShipmentsProvider";
import { TodosProvider } from "../../providers/TodosProvider";
import { TrackingProvider } from "../../providers/TrackingProvider";

const providers = [
  CustomerProvider,
  ShipmentsProvider,
  TodosProvider,
  TrackingProvider
];

export const AppContextProvider = CombineComponents(...providers);
