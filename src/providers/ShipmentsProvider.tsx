import React from "react";
import { 
  defaultShipmentData,
  ShipmentDataInterface 
} from "../interfaces/ShipmentDataInterface";
import {
  defaultPaginationData,
  PaginationDataInterface
} from "../interfaces/PaginationDataInterface";
import {
  defaultShipmentOverview,
  ShipmentsOverviewInterface
} from "../interfaces/ShipmentsOverviewInterface";
import { defaultShipmentQuery } from "../interfaces/ShipmentQueryInterface";
import { useApiError } from "./ApiErrorProvider";
import { error } from "../constants/bindings";
import SignRequest from "../helpers/SignRequest";

const ShipmentsContext = React.createContext({
  loading: true,
  shipmentsData: [defaultShipmentData],
  shipmentsOverview: defaultShipmentOverview,
  paginationData: defaultPaginationData,
  shipmentsQuery: defaultShipmentQuery,
  getShipmentsData: date => {}
});

export const ShipmentsProvider = props => {
  const [shipmentsQuery, setShipmentsQuery] =
    React.useState(defaultShipmentQuery);
  const [shipmentsData, setShipmentsData] = React.useState<ShipmentDataInterface[]>([]);
  const [shipmentsOverview, setShipmentsOverview] = React.useState(
    defaultShipmentOverview
  );
  const [paginationData, setPaginationData] = React.useState(
    defaultPaginationData
  );
  const [loading, setLoading] = React.useState(true);
  const { setErrorCode } = useApiError();

  const statusMap = [
    { key: "booked", value: ["BKD"] },
    { key: "accepted", value: ["RCS"] },
    {
      key: "inTransit",
      value: ["DEP", "RCF", "RPU", "MAN", "ARR", "PUL", "DLV"]
    },
    { key: "outForDelivery", value: ["GDL"] },
    { key: "deliveryAttempt", value: ["ADL"] },
    { key: "doorDelivered", value: ["DLD", "DPU", "DDL"] },
    { key: "missing", value: ["MMM"] },
    { key: "returnToShipper", value: ["RTS"] }
  ];

  const findTotalCountByEvent = (data, event) => {
    let totalCount = 0;
    const status = statusMap.find(el => el.key === event);
    let eventCodes = status ? status.value : [];
    for (const eventCode of eventCodes) {
      const el = data.find(el => el.event === eventCode);
      totalCount = totalCount + (el ? el.count : 0);
    }
    return totalCount;
  };

  const getShipmentsData = async shipmentsQuery => {
    setShipmentsQuery(shipmentsQuery);
    if (!shipmentsQuery) {
      return;
    }
    setShipmentsData([]);
    setLoading(true);
    try {
      const body = {
        SK_ID: shipmentsQuery.account,
        startDate: shipmentsQuery.startDate,
        endDate: shipmentsQuery.endDate,
        pageNumber: parseInt(shipmentsQuery.pageNumber),
        pageSize:  parseInt(shipmentsQuery.pageSize),
        packageReference: shipmentsQuery.packageReference,
        airWaybill: shipmentsQuery.airWaybill,
        lastEventType: shipmentsQuery.lastEventType.toString(),
        city: shipmentsQuery.city
      };

      // CALL: https://apigw.cargo-rivo-int.digital.aircanada.com/shipment_history/details
      const rawShipmentsData = await SignRequest(
        "POST",
        process.env.REACT_APP_API_BASE,
        process.env.REACT_APP_AKAMAI_DBAAS_API_URL,
        "/shipment_history/details",
        body
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

      if (!rawShipmentsData.results) {
        setShipmentsData([]);
        setPaginationData(defaultPaginationData);
        setShipmentsOverview(shipmentsOverview);
        return;
      }

      // CALL: https://apigw.cargo-rivo-int.digital.aircanada.com/shipment_summary/details
      const rawShipmentsOverview = await SignRequest(
        "POST",
        process.env.REACT_APP_API_BASE,
        process.env.REACT_APP_AKAMAI_DBAAS_API_URL,
        "/shipment_summary/details",
        body
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

      setShipmentsData(rawShipmentsData.results);

      setShipmentsOverview({
        booked: findTotalCountByEvent(rawShipmentsOverview, "booked"),
        accepted: findTotalCountByEvent(rawShipmentsOverview, "accepted"),
        inTransit: findTotalCountByEvent(rawShipmentsOverview, "inTransit"),
        outForDelivery: findTotalCountByEvent(
          rawShipmentsOverview,
          "outForDelivery"
        ),
        deliveryAttempt: findTotalCountByEvent(
          rawShipmentsOverview,
          "deliveryAttempt"
        ),
        doorDelivered: findTotalCountByEvent(
          rawShipmentsOverview,
          "doorDelivered"
        ),
        missing: findTotalCountByEvent(rawShipmentsOverview, "missing"),
        returnToShipper: findTotalCountByEvent(
          rawShipmentsOverview,
          "returnToShipper"
        )
      } as ShipmentsOverviewInterface);

      setPaginationData({
        currentPage: rawShipmentsData.currentPage,
        pageCount: rawShipmentsData.pageCount,
        pageSize: rawShipmentsData.pageSize
      } as PaginationDataInterface);

      setLoading(false);
      return rawShipmentsData;
    } catch (e: any) {
      if (e.response?.status) {
        setErrorCode(e.response?.status);
      } else {
        setErrorCode(error.DEFAULT);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShipmentsContext.Provider
      value={{
        loading,
        shipmentsData,
        shipmentsOverview,
        paginationData,
        shipmentsQuery,
        getShipmentsData
      }}
    >
      {props.children}
    </ShipmentsContext.Provider>
  );
};

export const useShipments = () => {
  const context = React.useContext(ShipmentsContext);
  return context;
};
