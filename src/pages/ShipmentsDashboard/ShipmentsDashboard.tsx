import React, { useEffect, useReducer, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation, getI18n } from "react-i18next";
import { useShipments } from "../../providers/ShipmentsProvider";
import { ShipmentDataInterface } from "../../interfaces/ShipmentDataInterface";
import { defaultShipmentOverview } from "../../interfaces/ShipmentsOverviewInterface";
import { defaultPaginationData } from "../../interfaces/PaginationDataInterface";
import ShipmentsDatePicker from "../../components/ShipmentsDatePicker/ShipmentsDatePicker";
import ShipmentsSkSelect from "../../components/ShipmentsSkSelect/ShipmentsSkSelect";
import ShipmentsFilterPanel from "../../components/ShipmentsFilterPanel/ShipmentsFilterPanel";
import ShipmentsOverviewPanel from "../../components/ShipmentsOverviewPanel/ShipmentsOverviewPanel";
import ShipmentsListPanel from "../../components/ShipmentsListPanel/ShipmentsListPanel";
import { PageHeader } from "./ShipmentsDashboard.style";
import Moment from "moment";
import { TabTitle } from "../../utils/GeneralFunctions";
import { useTracking } from "../../providers/TrackingProvider";

const reducerList = (state, action) => {
  switch (action.type) {
    case "dates":
      return {
        ...state,
        startDate: action.startDateValue,
        endDate: action.endDateValue
      };
    case "order":
      return { ...state, order: action.value };
    case "orderBy":
      return { ...state, orderBy: action.value };
    case "airWaybill":
      return { ...state, airWaybill: action.value };
    case "packageReference":
      return { ...state, packageReference: action.value };
    case "account":
      return { ...state, account: action.value };
    case "city":
      return { ...state, city: action.value };
    case "lastEventType":
      return { ...state, lastEventType: action.value };
    case "pageSize":
      return { ...state, pageSize: action.value };
    case "pageNumberIncrement":
      return {
        ...state,
        pageNumber: parseInt(state.pageNumber) + parseInt(action.value)
      };
    case "pageNumberOne":
      return { ...state, pageNumber: 1 };
    case "loadMore":
      return { ...state, loadMore: action.value };
    default:
      return state;
  }
};

function ShipmentsDashboard() {
  Moment.locale(getI18n().resolvedLanguage);
  const initialListState = {
    startDate: Moment().subtract(14, "days").format("YYYY-MM-DD"),
    endDate: Moment().format("YYYY-MM-DD"),
    order: "asc",
    orderBy: "airWaybill",
    airWaybill: "",
    packageReference: "",
    city: "",
    lastEventType: "",
    pageNumber: "1",
    pageSize: "50",
    loadMore: false
  };
  const [listState, dispatchList] = useReducer(reducerList, initialListState);
  const [rows, setRows] = useState<ShipmentDataInterface[]>([]);
  const [overview, setOverview] = useState(defaultShipmentOverview);
  const [pagination, setPagination] = useState(defaultPaginationData);
  const shipmentContext = useShipments();
  const { t } = useTranslation();
  const trackingContext = useTracking();
  const [initialDataLoadedFlag, setInitialDataLoadedFlag] = useState(false);
  const [noResults, setNoResults] = useState(false);

  TabTitle(t("todo-dashboard.block1.header.page-title"));

  useEffect(() => {
    // call getShipmentsData
    setInitialDataLoadedFlag(false);
    setRows([]);
    dispatchList({ type: "pageNumberOne", value: 1 });
    trackingContext.resetTrackingData();
    shipmentContext.getShipmentsData({
      startDate: listState.startDate,
      endDate: listState.endDate,
      account: listState.account,
      pageNumber: "1",
      pageSize: listState.pageSize,
      airWaybill: listState.airWaybill,
      packageReference: listState.packageReference,
      city: listState.city,
      lastEventType: listState.lastEventType
    });
    // excluding dependancy on listState.order and orderBy for now.
    // eslint-disable-next-line
  }, [
    listState.startDate,
    listState.endDate,
    listState.account,
    listState.pageSize,
    listState.airWaybill,
    listState.packageReference,
    listState.city,
    listState.lastEventType
  ]);

  useEffect(() => {
    // call getShipmentsData LOAD MORE!!!!
    if (listState.loadMore) {
      shipmentContext.getShipmentsData({
        startDate: listState.startDate,
        endDate: listState.endDate,
        account: listState.account,
        pageNumber: listState.pageNumber,
        pageSize: listState.pageSize,
        airWaybill: listState.airWaybill,
        packageReference: listState.packageReference,
        city: listState.city,
        lastEventType: listState.lastEventType
      });
      dispatchList({ type: "loadMore", value: false });
    }

    // excluding dependancy on listState.order and orderBy for now.
    // eslint-disable-next-line
  }, [listState.pageNumber]);

  // listen to loading so it only sets rows and pagination once all the data is ready
  useEffect(() => {
    if (!shipmentContext.loading) {
      // getShipmentsData if changed then update rows and pagination!
      setPagination(shipmentContext.paginationData);
      setOverview(shipmentContext.shipmentsOverview);
      setInitialDataLoadedFlag(true);
      if (shipmentContext.shipmentsData?.length === 0) {
        setNoResults(true);
      } else if (shipmentContext.paginationData.currentPage === 1) {
        // initial page load
        setNoResults(false);
        setRows([]);
        setRows(shipmentContext.shipmentsData);
      } else {
        // load more pages
        setRows([...rows, ...shipmentContext.shipmentsData]);
      }
    }
    // eslint-disable-next-line
  }, [
    shipmentContext.loading,
    shipmentContext.shipmentsData,
    shipmentContext.paginationData,
    shipmentContext.shipmentsOverview
  ]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PageHeader>
        <Typography component="h1" variant="h2" className="pageTitle">
          {t("todo-dashboard.block1.header.page-title")}
        </Typography>
        <Box className="headerExtra">
          <ShipmentsDatePicker
            startDate={listState.startDate}
            endDate={listState.endDate}
            dispatchList={dispatchList}
          />
          <ShipmentsSkSelect dispatchList={dispatchList} />
        </Box>
      </PageHeader>

      {/* <ShipmentsFilterPanel dispatchList={dispatchList} /> */}

      <ShipmentsOverviewPanel
        booked={overview.booked}
        accepted={overview.accepted}
        inTransit={overview.inTransit}
        outForDelivery={overview.outForDelivery}
        deliveryAttempt={overview.deliveryAttempt}
        doorDelivered={overview.doorDelivered}
        missing={overview.missing}
        returnToShipper={overview.returnToShipper}
        startDate={listState.startDate}
        endDate={listState.endDate}
        initialDataLoadedFlag={initialDataLoadedFlag}
      />

      {/* <ShipmentsListPanel
        listState={listState}
        dispatchList={dispatchList}
        rows={rows}
        pagination={pagination}
        initialDataLoadedFlag={initialDataLoadedFlag}
        noResults={noResults}
        loading={shipmentContext.loading}
      /> */}
    </Box>
  );
}
export default ShipmentsDashboard;
