import { useTranslation } from "react-i18next";
import { useTracking } from "../../providers/TrackingProvider";
import { Link } from "react-router-dom";
import { ActionItem } from "./ShipmentsRowActionTab.style";
function ShipmentsRowActionTab({ airwayBill }) {
  const { t } = useTranslation();
  const trackingContext = useTracking();
  const trackingDetails = trackingContext.trackingData.get(airwayBill)[
    "Content"
  ][0] as any;

  return (
    <ActionItem>
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
    </ActionItem>
  );
}

export default ShipmentsRowActionTab;
