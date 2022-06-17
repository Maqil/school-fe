import React, { useMemo, useCallback, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import { SectionAccordion } from "../../pages/ShipmentsDashboard/ShipmentsDashboard.style";
import {
  StatusMenuItem,
  FilterPanel,
  FilterPanelButtonWrapper,
  FilterPanelFieldsWrapper
} from "./ShipmentsFilterPanel.style";
import {
  Paper,
  Typography,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import debounce from "lodash.debounce";

function ShipmentsFilterPanel(props) {
  const { t } = useTranslation();
  const { dispatchList } = props;
  const [airWaybill, setAirWaybill] = React.useState<string>("");
  const [packageReference, setPackageReference] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [status, setStatus] = React.useState<string[]>([]);

  const statusMap = [
    {
      key: t("shipments-dashboard.filter.status.label.booked"),
      value: "BKD"
    },
    {
      key: t("shipments-dashboard.filter.status.label.accepted"),
      value: "RCS"
    },
    {
      key: t("shipments-dashboard.filter.status.label.in-transit"),
      value: "DEP,RCF,RPU,MAN,ARR,PUL,DLV"
    },
    {
      key: t("shipments-dashboard.filter.status.label.out-for-delivery"),
      value: "GDL"
    },
    {
      key: t("shipments-dashboard.filter.status.label.delivery-attempt"),
      value: "ADL"
    },
    {
      key: t("shipments-dashboard.filter.status.label.delivered"),
      value: "DLD,DPU,DDL"
    },
    /** 
     * HIDE FOR NOW TILL FUTURE PHASE
    { 
      key: t("shipments-dashboard.filter.status.label.missing"),
      value: "MMM"
    },
    **/
    {
      key: t("shipments-dashboard.filter.status.label.return-to-shipper"),
      value: "RTS"
    }
  ];

  const handleClearChanges = () => {
    setAirWaybill("");
    dispatchList({ type: "airWaybill", value: "" });
    setPackageReference("");
    dispatchList({ type: "packageReference", value: "" });
    setCity("");
    dispatchList({ type: "city", value: "" });
    setStatus([]);
    dispatchList({ type: "lastEventType", value: "" });
  };

  // call dispatchList to apply the filter
  const changeFilterHandler = useCallback(
    (event, type) => {
      dispatchList({ type: type, value: event.target.value });
    },
    [dispatchList]
  );

  const changeFilterStatusHandler = event => {
    const {
      target: { value }
    } = event;
    setStatus(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    let newArray = value.toString().split(",");
    const statusCodes = newArray.map(
      status => statusMap.find(el => el.key === status)?.value
    );
    dispatchList({ type: "lastEventType", value: statusCodes });
  };

  // Debounce before changing the filter
  // to avoid to many api request when typing fast
  const debouncedChangeFilterHandler = useMemo(
    () => debounce(changeFilterHandler, 300),
    [changeFilterHandler]
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedChangeFilterHandler.cancel();
    };
  }, [debouncedChangeFilterHandler]);

  return (
    <Paper variant="section" sx={{ padding: 0 }}>
      <SectionAccordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="filter-panel-content"
          id="filter-panel-header"
        >
          <Typography component="h2" variant="sectionTitle">
            {t("shipments-dashboard.filter.header.section-title")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterPanel>
            <FilterPanelButtonWrapper>
              <Button
                size="small"
                variant="outlined"
                onClick={handleClearChanges}
                disabled={
                  !airWaybill &&
                  !packageReference &&
                  !city &&
                  status.length === 0
                }
              >
                {t("shipments-dashboard.filter.button.clear")}
              </Button>
            </FilterPanelButtonWrapper>
            <FilterPanelFieldsWrapper>
              <FormControl>
                <TextField
                  label={t("shipments-dashboard.filter.label.airWaybill")}
                  id="airWaybill"
                  type="text"
                  name="airWaybill"
                  value={airWaybill}
                  onChange={e => {
                    setAirWaybill(e.target.value);
                    debouncedChangeFilterHandler(e, "airWaybill");
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  label={t("shipments-dashboard.filter.label.packageReference")}
                  id="packageReference"
                  type="text"
                  name="packageReference"
                  value={packageReference}
                  onChange={e => {
                    setPackageReference(e.target.value);
                    debouncedChangeFilterHandler(e, "packageReference");
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  label={t("shipments-dashboard.filter.label.destination")}
                  id="consigneeCity"
                  type="text"
                  name="consigneeCity"
                  value={city}
                  onChange={e => {
                    setCity(e.target.value);
                    debouncedChangeFilterHandler(e, "city");
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  select
                  label={t("shipments-dashboard.filter.label.status")}
                  id="status-multiple-checkbox-test"
                  name="status-multiple-checkbox-test"
                  onChange={changeFilterStatusHandler}
                  value={status}
                  SelectProps={{
                    multiple: true,
                    renderValue: selected => (selected as string[]).join(",")
                  }}
                >
                  {statusMap.map(s => (
                    <StatusMenuItem key={s.value} value={s.key}>
                      <Checkbox checked={status.indexOf(s.key) > -1} />
                      <ListItemText primary={s.key} />
                    </StatusMenuItem>
                  ))}
                </TextField>
              </FormControl>
            </FilterPanelFieldsWrapper>
          </FilterPanel>
        </AccordionDetails>
      </SectionAccordion>
    </Paper>
  );
}

export default ShipmentsFilterPanel;
