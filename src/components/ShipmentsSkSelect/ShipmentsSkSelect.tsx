import { useEffect, useMemo, useState } from "react";
import { SkSelectStyle } from "./ShipmentsSkSelect.style";
import { useTranslation } from "react-i18next";
import { useCustomer } from "../../providers/CustomerProvider";
import TextField from "@mui/material/TextField";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";

function ShipmentsSkSelect(props) {
  const { t } = useTranslation();
  const { customerData } = useCustomer();
  const { dispatchList } = props;

  const accountNumbers = useMemo(() => {
    // transform string to array of accounts
    return (
      (customerData.length > 0 &&
        customerData[0].accountNumber &&
        customerData[0].accountNumber.split(";")) ||
      []
    );
  }, [customerData]);

  useEffect(() => {
    if (accountNumbers.length > 0) {
      updateAccount(accountNumbers[0]);
      if (accountNumbers.length > 1) {
        setSelectStatus("visible");
      } else {
        setSelectStatus("hidden");
      }
    }
    // eslint-disable-next-line
  }, [accountNumbers]);

  // set up default value
  const [skValue, setSkValue] = useState<string>("");
  const [skSelectStatus, setSelectStatus] = useState<string>("hidden");

  // create sk map for dropdown
  const skMap: any = [];
  accountNumbers.forEach(function (acct) {
    skMap.push({ key: acct, value: acct });
  });

  const changeSkHandler = event => {
    updateAccount(event.target.value);
  };

  function updateAccount(skID) {
    setSkValue(skID);
    dispatchList({ type: "account", value: skID });
  }

  return (
    <SkSelectStyle className={skSelectStatus}>
      <TextField
        select
        label={t("shipments-dashboard.sk.label.select")}
        id="select-sk"
        name="select-sk"
        onChange={changeSkHandler}
        value={skValue}
      >
        {skMap.map(s => (
          <MenuItem key={s.value} value={s.key}>
            <ListItemText primary={s.key} />
          </MenuItem>
        ))}
      </TextField>
    </SkSelectStyle>
  );
}

export default ShipmentsSkSelect;
