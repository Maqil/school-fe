import { useTranslation } from "react-i18next";
import { useTracking } from "../../providers/TrackingProvider";
import { DetailsList } from "./ShipmentsRowDetailsTab.style";
import Moment from "moment";
import { Link } from "react-router-dom";

function ShipmentsRowDetailsTab({ airwayBill }) {
  const { t } = useTranslation();
  const trackingContext = useTracking();
  const trackingDetails = trackingContext.trackingData.get(airwayBill)[
    "Content"
  ][0] as any;

  function convertWeight(weight: number, purpose = "display") {
    const weightInPounds = Math.ceil(weight * 2.20462 * 100) / 100;
    let unitLb = "";
    if (purpose === "readout") {
      unitLb =
        weightInPounds > 2
          ? t("tracking-results.shipping-details.text.abbrev-lbs")
          : t("tracking-results.shipping-details.text.abbrev-lb");
      return `${weight} ${t(
        "tracking-results.shipping-details.text.abbrev-kg"
      )} (${weightInPounds.toString()} ${unitLb})`;
    } else {
      unitLb = weightInPounds > 2 ? "LBS" : "LB";
      return `${weight} KG (${weightInPounds.toString()} ${unitLb})`;
    }
  }

  function convertWeighToKGS(weight: number, purpose = "display") {
    const weightInKilograms = Math.ceil((weight / 2.20462) * 100) / 100;
    let unitLb = "";
    if (purpose === "readout") {
      unitLb =
        weightInKilograms > 2
          ? t("tracking-results.shipping-details.text.abbrev-kgs")
          : t("tracking-results.shipping-details.text.abbrev-kg");
      return `${weight} ${t(
        "tracking-results.shipping-details.text.abbrev-lb"
      )} (${weightInKilograms.toString()} ${unitLb})`;
    } else {
      unitLb = weightInKilograms > 1 ? "KGS" : "KG";
      return `${weight} LBS (${weightInKilograms.toString()} ${unitLb})`;
    }
  }

  function expectedDeliveryDate() {
    let dateToUse =
      trackingDetails.Events[trackingDetails.Events.length - 1].TimeTable
        .TimeStamp;
    return t(
      "tracking-results.delivery-date.text.expected-delivery-date-value",
      {
        day: Moment(dateToUse).format("D"),
        month: Moment(dateToUse).format("MMMM"),
        year: Moment(dateToUse).format("YYYY")
      }
    );
  }

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
    Moment(
      trackingDetails.Events[trackingDetails.Events.length - 1].TimeTable
        .TimeStamp
    ).isBefore() &&
    !asReachedDestination(
      trackingDetails.Events[trackingDetails.Events.length - 1].Type.Code
    )
      ? true
      : false;

  return (
    <DetailsList>
      <div className="shipment-details-title">
        {t("tracking-results.shipping-details.header.info")}
      </div>
      <div className="shipment-details-item">
        <div className="shipment-details-icon">
          <i className="icon-plane-hollow"></i>
        </div>
        <div className="shipment-details-info">
          <div className="shipment-details-label">
            {t("tracking-results.shipping-details.label.origin")}
          </div>
          <div className="shipment-details-data">
            {trackingDetails.participants[0].city.charAt(0).toUpperCase() +
              trackingDetails.participants[0].city.slice(1).toLowerCase() +
              ", " +
              trackingDetails.participants[0].state}
          </div>
        </div>
      </div>
      <div className="shipment-details-item">
        <div className="shipment-details-icon">
          <i className="icon-location-hollow"></i>
        </div>
        <div className="shipment-details-info">
          <div className="shipment-details-label">
            {t("tracking-results.shipping-details.label.destination")}
          </div>
          <div className="shipment-details-data">
            {trackingDetails.participants[1].city.charAt(0).toUpperCase() +
              trackingDetails.participants[1].city.slice(1).toLowerCase() +
              ", " +
              trackingDetails.participants[1].state}
          </div>
        </div>
      </div>
      <div className="shipment-details-item">
        <div className="shipment-details-icon">
          <i className="icon-box-hollow"></i>
        </div>
        <div className="shipment-details-info">
          <div className="shipment-details-label">
            {t("tracking-results.shipping-details.text.weight")}
          </div>
          {/* display the weigt here! */}
          {trackingDetails.Counts[0].Unit === "LBR" ? (
            <div className="shipment-details-data">
              {/* convertToKGS */}
              <span
                className="weight info"
                aria-label={convertWeighToKGS(
                  trackingDetails.Counts[0].Weight,
                  "readout"
                )}
              >
                {convertWeighToKGS(trackingDetails.Counts[0].Weight)}
              </span>
            </div>
          ) : (
            <div className="shipment-details-data">
              {/* convertToLBS */}
              <span
                className="weight info"
                aria-label={convertWeight(
                  trackingDetails.Counts[0].Weight,
                  "readout"
                )}
              >
                {convertWeight(trackingDetails.Counts[0].Weight)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="shipment-details-item">
        <div className="shipment-details-icon">
          <i className="icon-schedule"></i>
        </div>
        <div className="shipment-details-info">
          <div className="shipment-details-label">
            {t("tracking-results.shipping-details.text.schedule")}
          </div>
          <div className={`shipment-details-data ${isLate ? "is-late" : ""}`}>
            {expectedDeliveryDate()}{" "}
            {isLate
              ? "- " +
                t("shipments-dashboard.row.header.estimatedDeliveryDateLate")
              : ""}
          </div>
        </div>
      </div>
      <div className="action-details-item">
        <Link
          target="_blank"
          to={`/contact/${trackingDetails.AirWaybillReference}`}
        >
          <span>
            {" "}
            {t("tracking-results.shipping-details.header.report-case")}
          </span>{" "}
        </Link>
        <div className="shipment-action-icon">
          <i className="icon-external-link"></i>
        </div>
      </div>
    </DetailsList>
  );
}

export default ShipmentsRowDetailsTab;
