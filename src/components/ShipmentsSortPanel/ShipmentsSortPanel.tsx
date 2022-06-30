import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { TodoDataInterface } from "../../interfaces/TodoDataInterface";
import { visuallyHidden } from "@mui/utils";
import { SectionAccordion } from "../../pages/ShipmentsDashboard/ShipmentsDashboard.style";
import {
  Typography,
  Paper,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

function ShipmentsSortPanel(props) {
  const { t } = useTranslation();
  const { order, orderBy, dispatchList } = props;
  interface HeadCell {
    id: keyof TodoDataInterface;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "todoAiid",
      numeric: false,
      label: "Todo Id #"
    },
    {
      id: "description",
      numeric: true,
      label: "Customer Order #"
    },
    {
      id: "subject",
      numeric: true,
      label: "Estimated Delivery Date"
    },
    {
      id: "professor",
      numeric: true,
      label: "Status"
    }
  ];

  return (
    <Paper variant="section" sx={{ padding: 0 }}>
      <SectionAccordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="h2" variant="sectionTitle">
            {t("shipments-dashboard.sort.header.section-title")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {headCells.map(headCell => (
            <div key={headCell.id}>
              <div>
                <button
                  onClick={() => {
                    dispatchList({ type: "orderBy", value: headCell.id });
                    dispatchList({ type: "order", value: "asc" });
                  }}
                >
                  Change Order asc
                </button>
                <button
                  onClick={() => {
                    dispatchList({ type: "orderBy", value: headCell.id });
                    dispatchList({ type: "order", value: "desc" });
                  }}
                >
                  Change Order desc
                </button>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </div>
            </div>
          ))}
        </AccordionDetails>
      </SectionAccordion>
    </Paper>
  );
}

export default ShipmentsSortPanel;
