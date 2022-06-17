import { useTranslation } from "react-i18next";
import { ShipmentsOverviewInterface } from "../../interfaces/ShipmentsOverviewInterface";
import { SectionAccordion } from "../../pages/ShipmentsDashboard/ShipmentsDashboard.style";
import {
  ButtonGroupDelivery,
  ButtonDelivery,
  ButtonGroupPostDelivery,
  ButtonPostDelivery,
  ButtonGroupWrapper,
  ButtonChevron
} from "./ShipmentsOverviewPanel.style";
import {
  Paper,
  Typography,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Moment from "moment";

function ShipmentsOverviewPanel(props: ShipmentsOverviewInterface) {
  const { t } = useTranslation();
  const {
    booked,
    accepted,
    inTransit,
    outForDelivery,
    deliveryAttempt,
    doorDelivered,
    missing,
    returnToShipper,
    startDate,
    endDate,
    initialDataLoadedFlag
  } = props;

  return (
    <Paper variant="section" sx={{ padding: 0 }}>
      <SectionAccordion
        className={initialDataLoadedFlag ? "loaded" : "not-loaded"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            component="h2"
            variant="sectionTitle"
            sx={{ paddingRight: "2rem" }}
          >
            {t("shipments-dashboard.overview.header.section-title")}
          </Typography>
          <Typography component="div" variant="body1">
            {Moment(startDate).format("ll")} - {Moment(endDate).format("ll")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ButtonGroupWrapper>
            <ButtonGroupDelivery>
              <ButtonDelivery>
                {t("shipments-dashboard.overview.button.label.booked")}
                <span>{booked}</span>
                <ButtonChevron />
              </ButtonDelivery>
              <ButtonDelivery>
                {t("shipments-dashboard.overview.button.label.accepted")}
                <span>{accepted}</span>
                <ButtonChevron />
              </ButtonDelivery>
              <ButtonDelivery>
                {t("shipments-dashboard.overview.button.label.inTransit")}
                <span>{inTransit}</span>
                <ButtonChevron />
              </ButtonDelivery>
              <ButtonDelivery>
                {t("shipments-dashboard.overview.button.label.outForDelivery")}
                <span>{outForDelivery}</span>
                <ButtonChevron />
              </ButtonDelivery>
              <ButtonDelivery>
                {t("shipments-dashboard.overview.button.label.deliveryAttempt")}
                <span>{deliveryAttempt}</span>
                <ButtonChevron />
              </ButtonDelivery>
            </ButtonGroupDelivery>
            <ButtonGroupPostDelivery>
              <ButtonPostDelivery>
                {t("shipments-dashboard.overview.button.label.doorDelivered")}{" "}
                <span>{doorDelivered}</span>
              </ButtonPostDelivery>
              <ButtonPostDelivery>
                {t("shipments-dashboard.overview.button.label.missing")}{" "}
                <span>{missing}</span>
              </ButtonPostDelivery>
              <ButtonPostDelivery>
                {t("shipments-dashboard.overview.button.label.returnToShipper")}{" "}
                <span>{returnToShipper}</span>
              </ButtonPostDelivery>
            </ButtonGroupPostDelivery>
          </ButtonGroupWrapper>
        </AccordionDetails>
      </SectionAccordion>
    </Paper>
  );
}

export default ShipmentsOverviewPanel;
