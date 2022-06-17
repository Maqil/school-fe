import { useEffect, useState, SyntheticEvent } from "react";
import { useTranslation, getI18n } from "react-i18next";
import { useTracking } from "../../providers/TrackingProvider";
import { CircularProgress, Tab, Collapse } from "@mui/material";
import ShipmentsRowHistoryTab from "../ShipmentsRowHistoryTab/ShipmentsRowHistoryTab";
import ShipmentsRowDetailsTab from "../ShipmentsRowDetailsTab/ShipmentsRowDetailsTab";
import { ExpandMore, ArrowForward } from "@mui/icons-material";
import {
  RowBox,
  RowSummaryWrapper,
  RowSummaryAirbill,
  RowSummaryReference,
  RowSummaryLastEventType,
  RowSummaryConsigneeName,
  RowSummaryEstimatedDeliveryDate,
  RowSummaryButton,
  ShipmentDetailsNavTabs,
  ContentLoading,
  ListTabPanel,
  DesktopTabWrapper
} from "./ShipmentsRow.style";
import Moment from "moment";
import MediaQuery from "react-responsive";
import TabContext from "@mui/lab/TabContext";
import ShipmentsRowActionTab from "../ShipmentsRowActionTab/ShipmentsRowActionTab";

function ShipmentsRow(props) {
  const { t } = useTranslation();
  const trackingContext = useTracking();
  const { row } = props;
  const [contentLoaded, setContentLoaded] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [flag, setFlag] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [tabValue, setTabValue] = useState("1");

  Moment.locale(getI18n().resolvedLanguage);

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleRowExpand = async (event: SyntheticEvent) => {
    setExpanded(!expanded);
    if (!contentLoaded) {
      await trackingContext.getTrackingData(row.airWaybill);
      setFlag(true);
    } else {
      // do nothing... or handle reload because of previous error
      if (
        trackingContext.trackingData.get(row.airWaybill)?.status === "ERROR"
      ) {
        setContentError(false);
        setContentLoaded(false);
      }
    }
  };

  const reachedDestinationCodes = ["DLD", "DDL", "RTS", "ADL", "ATD", "DPU"];
  const asReachedDestination = shipmentEvent => {
    let asReachedDestinationFlag = false;
    for (const reachedDestinationCode of reachedDestinationCodes) {
      if (reachedDestinationCode === shipmentEvent) {
        asReachedDestinationFlag = true;
      }
    }
    return asReachedDestinationFlag;
  };
  const isLate =
    Moment(row.estimatedDeliveryDate).isBefore() &&
    !asReachedDestination(row.lastEventType)
      ? true
      : false;

  useEffect(() => {
    if (
      flag &&
      !trackingContext.loading &&
      trackingContext.trackingData.get(row.airWaybill)
    ) {
      setContentLoaded(true);
      if (
        trackingContext.trackingData.get(row.airWaybill)?.status === "ERROR"
      ) {
        setContentError(true);
        setFlag(false);
      }
    }
    // eslint-disable-next-line
  }, [trackingContext.loading, flag]);

  return (
    <RowBox>
      <RowSummaryWrapper data-at="row-wrapper">
        <RowSummaryAirbill data-at="row-tracking-number">
          <div className="data-label">
            {t("shipments-dashboard.row.header.airWaybill")}
          </div>
          <div className="data-value">{row.airWaybill}</div>
        </RowSummaryAirbill>
        <RowSummaryReference data-at="row-customer-order">
          <div className="data-label">
            {t("shipments-dashboard.row.header.packageReference")}
          </div>
          <div className="data-value">{row.packageReference}</div>
        </RowSummaryReference>
        <RowSummaryConsigneeName data-at="row-consignee">
          <div className="data-label">
            {t("shipments-dashboard.row.header.consigneeName")}
          </div>
          <div className="data-value">{row.consigneeName}</div>
        </RowSummaryConsigneeName>
        <RowSummaryEstimatedDeliveryDate data-at="row-estimated-delivery">
          <div className="data-label">
            {t("shipments-dashboard.row.header.estimatedDeliveryDate")}
          </div>
          <div className={`data-value ${isLate ? "is-late" : ""}`}>
            {Moment(row.estimatedDeliveryDate).format("MMM D")}{" "}
            {isLate
              ? "- " +
                t("shipments-dashboard.row.header.estimatedDeliveryDateLate")
              : ""}
          </div>
        </RowSummaryEstimatedDeliveryDate>
        <RowSummaryButton
          data-at="row-expand-button"
          className={expanded ? "row-details-expanded" : "row-details-closed"}
          onClick={handleRowExpand}
        >
          <ExpandMore />
        </RowSummaryButton>
        <RowSummaryLastEventType data-at="row-status">
          <div className="data-label">
            {t("shipments-dashboard.row.header.lastEventType")}
          </div>
          <div className="data-value">
            <div>
              {row.lastEventType
                ? t("shipments-dashboard.row.status." + row.lastEventType)
                : " "}
            </div>
            <div className="data-extra">
              <span className="details-ship-city">
                {row.shipperCity.charAt(0).toUpperCase() +
                  row.shipperCity.slice(1).toLowerCase()}
              </span>{" "}
              <ArrowForward />{" "}
              <span className="details-con-city">
                {row.consigneeCity.charAt(0).toUpperCase() +
                  row.consigneeCity.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
          <div className="data-bar">
            <div
              className="data-progression"
              data-type={row.lastEventType}
            ></div>
          </div>
        </RowSummaryLastEventType>
      </RowSummaryWrapper>
      <Collapse in={expanded}>
        <Collapse
          in={contentLoaded && !contentError}
          mountOnEnter
          className="row-details-wrapper"
        >
          <MediaQuery maxWidth={767}>
            <TabContext value={tabValue}>
              <ShipmentDetailsNavTabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                variant="fullWidth"
                selectionFollowsFocus
                aria-label="Tabs with more information about this shipment. Use the arrow key to navigate between tabs."
              >
                <Tab
                  label={t("tracking-results.shipping-details.header.history")}
                  value="1"
                />
                <Tab
                  label={t("tracking-results.shipping-details.header.info")}
                  value="2"
                />
                <Tab
                  label={t("tracking-results.shipping-details.header.action")}
                  value="3"
                />
              </ShipmentDetailsNavTabs>
              <ListTabPanel value="1">
                <ShipmentsRowHistoryTab airwayBill={row.airWaybill} />
              </ListTabPanel>
              <ListTabPanel value="2">
                <ShipmentsRowDetailsTab airwayBill={row.airWaybill} />
              </ListTabPanel>
              <ListTabPanel value="3">
                <ShipmentsRowActionTab airwayBill={row.airWaybill} />
              </ListTabPanel>
            </TabContext>
          </MediaQuery>
          <MediaQuery minWidth={768}>
            <DesktopTabWrapper>
              <ShipmentsRowHistoryTab airwayBill={row.airWaybill} />
              <ShipmentsRowDetailsTab airwayBill={row.airWaybill} />
            </DesktopTabWrapper>
          </MediaQuery>
        </Collapse>
        <Collapse
          in={!contentLoaded && !contentError}
          mountOnEnter
          unmountOnExit
        >
          <ContentLoading>
            <CircularProgress size={60} />
          </ContentLoading>
        </Collapse>
        <Collapse in={contentError} mountOnEnter>
          <ContentLoading>
            <span className="error">
              {t("shipments-dashboard.row.header.error.load")}
            </span>
          </ContentLoading>
        </Collapse>
      </Collapse>
    </RowBox>
  );
}

export default ShipmentsRow;
