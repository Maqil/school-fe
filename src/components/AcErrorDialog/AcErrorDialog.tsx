import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { error } from "../../constants/bindings";
import AcDialogInterface from "../../interfaces/AcDialogInterface";
import { useAuth } from "../../providers/Auth";
import AcDialog from "../AcDialog/AcDialog";
import { useApiError } from "../../providers/ApiErrorProvider";

export default function AcErrorDialog({ errorCode }) {
  const { t } = useTranslation();
  const user = useAuth();

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const { setErrorCode } = useApiError();

  useEffect(() => {
    if (errorCode !== 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [errorCode]);

  const handleLogout = () => {
    user.signOut();
    setOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLogin = () => {
    localStorage.clear();
    //user.signIn();
  };

  const handleCloseContactFrom = () => {
    setErrorCode(0);
  }

  const defaultErrorData: AcDialogInterface = {
    icon: "icon-sad-emoji",
    title: t("errorDefault.title"),
    description: t("errorDefault.description"),
    actionLabel: t("errorDefault.buttonText"),
    handleAction: handleLogout,
    secondaryActionLabel: t("errorDefault.secondaryButtonText"),
    handleSecondaryAction: handleRefresh
  };

  const authErrorData: AcDialogInterface = {
    title: t("errorAuth.title"),
    description: t("errorAuth.description"),
    actionLabel: t("errorAuth.buttonText"),
    handleAction: handleLogin
  };

  const timeoutErrorData: AcDialogInterface = {
    icon: "icon-sad-emoji",
    title: t("errorTimeout.title"),
    description: t("errorTimeout.description"),
    support: t("errorTimeout.support"),
    actionLabel: t("errorTimeout.buttonText"),
    handleAction: handleRefresh
  };

  const contactFormErrorData: AcDialogInterface = {
    icon: "icon-sad-emoji",
    title: t("errorContactForm.title"),
    description: t("errorContactForm.description"),
    actionLabel: t("errorContactForm.buttonText"),
    handleAction: handleCloseContactFrom
  };

  const getData = () => {
    if (errorCode === error.AUTH || errorCode === error.FORBIDDEN) {
      return authErrorData;
    } else if (errorCode === error.TIME_OUT) {
      return timeoutErrorData;
    } else if (errorCode === error.CREATE_CASE) {
      return contactFormErrorData;
    } else {
      return defaultErrorData;
    }
  };

  return (
    <>
      <AcDialog open={open} onClose={handleClose} data={getData()} />
    </>
  );
}
