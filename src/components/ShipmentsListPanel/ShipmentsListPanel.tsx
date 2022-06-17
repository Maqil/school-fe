import { Box, Collapse, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import ShipmentsRow from "../ShipmentsRow/ShipmentsRow";
import { ArrowUpward } from "@mui/icons-material";
import emptyBoxImg from "../../assets/images/empty-list-icon.svg";
import { LoadingButton } from "@mui/lab";
import {
  ListFooter,
  ListPagination,
  ListLoadMore,
  ListGoBackUpWrapper,
  ListGoBackUp,
  ListNoResults,
  ListLoading,
  ListRowWrapper
} from "./ShipmentsListPanel.style";

function ShipmentsListPanel(props) {
  const { t } = useTranslation();
  const {
    listState,
    dispatchList,
    rows,
    pagination,
    initialDataLoadedFlag,
    noResults,
    loading
  } = props;
  //const noResults = false; // TODO make this flag dynamic if no results
  const handleLoadMore = () => {
    if (parseInt(pagination.currentPage) < pagination.pageCount) {
      //let newPageCurrentNumber = String(parseInt(pagination.currentPage) + 1);
      //console.log(">>>> INCREMENTED pageNumber=" + newPageCurrentNumber);
      dispatchList({ type: "pageNumberIncrement", value: 1 });
      dispatchList({ type: "loadMore", value: true });
    } else {
      // do nothing... no more to load!
    }
  };

  const handleGoUp = () => {
    window.scrollTo(0, 0);
  };

  function descendingComparator<T>(a: T, b: T, sortBy: keyof T) {
    if (b[sortBy] < a[sortBy]) {
      return -1;
    }
    if (b[sortBy] > a[sortBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    // order: Order,
    sortBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return listState.order === "desc"
      ? (a, b) => descendingComparator(a, b, sortBy)
      : (a, b) => -descendingComparator(a, b, sortBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  return (
    <Box>
      <Collapse in={!initialDataLoadedFlag} mountOnEnter>
        <ListLoading variant="section">
          <CircularProgress size={60} />
        </ListLoading>
      </Collapse>
      <Collapse in={initialDataLoadedFlag && !noResults} mountOnEnter>
        <ListRowWrapper
          variant="section"
          sx={{ padding: 0 }}
          className="shipments-row-wrapper"
        >
          {stableSort(rows, getComparator(listState.sortBy)).map(row => (
            <ShipmentsRow
              key={row.airWaybill}
              row={row}
              rowId={`row-${row.airWaybill}`}
            />
          ))}
        </ListRowWrapper>
      </Collapse>
      <Collapse in={initialDataLoadedFlag && noResults} mountOnEnter>
        <ListNoResults variant="section">
          <img className="empty-box" src={emptyBoxImg} alt="" />
          <Typography component="h3" variant="h3" className="noresults-title">
            {t("shipments-dashboard.list.header.no-results")}
          </Typography>
          <Typography component="p" variant="body1">
            {t("shipments-dashboard.list.text.no-results")}
          </Typography>
        </ListNoResults>
      </Collapse>
      <ListFooter>
        <ListLoadMore>
          <LoadingButton
            size="small"
            variant="outlined"
            loading={loading}
            loadingPosition="end"
            endIcon={<div />}
            onClick={handleLoadMore}
            sx={{
              display:
                parseInt(pagination.currentPage) === pagination.pageCount ||
                parseInt(pagination.pageCount) === 0
                  ? "none"
                  : "flex"
            }}
          >
            {t("shipments-dashboard.list.button.load-more")}
          </LoadingButton>
        </ListLoadMore>
        <ListGoBackUpWrapper>
          <ListGoBackUp variant="contained" onClick={handleGoUp}>
            <ArrowUpward />
          </ListGoBackUp>
        </ListGoBackUpWrapper>
        <ListPagination
          sx={{
            display: parseInt(pagination.pageCount) === 0 ? "none" : "flex"
          }}
        >
          {t("shipments-dashboard.list.text.pagination")}{" "}
          <span>
            {pagination.currentPage} / {pagination.pageCount}
          </span>
        </ListPagination>
      </ListFooter>
    </Box>
  );
}

export default ShipmentsListPanel;
