import React from "react";
import { useTranslation, getI18n } from "react-i18next";
import { useTracking } from "../../providers/TrackingProvider";
import Moment from "moment";
import { HistoryList } from "./ShipmentsRowHistoryTab.style";
import CheckIcon from "@mui/icons-material/Check";

function ShipmentsRowHistoryTab({ airwayBill }) {
  const { t } = useTranslation();
  const trackingContext = useTracking();
  let lastTrackingCode = "";

  const trackingDetails = trackingContext.trackingData.get(airwayBill)[
    "Content"
  ][0] as any;

  Moment.locale(getI18n().resolvedLanguage);
  const validCodes = [
    "BKD",
    "RCS",
    "DEP",
    "RCF",
    "GDL",
    "ADL",
    "RPU",
    "DLD",
    "DPU",
    "DDL",
    "RTS"
  ];

  const atConsigneeLocationCodes = ["DLD", "DDL", "GDL", "ADL", "ATD", "DPU"];

  const arrivedAtConsigneeLocation = (shipmentEvent) => {
    let isAtConsigneeLocationFlag = false;
    for (const atConsigneeLocationCode of atConsigneeLocationCodes) {
      if (atConsigneeLocationCode === shipmentEvent) {
        isAtConsigneeLocationFlag = true;
      }
    }
    return isAtConsigneeLocationFlag;
  };

  function hasNumber(myString: string) {
    return /\d/.test(myString);
  }

  // Makes the first letter of the week day capital for french
  const dateCapitalized = (date) => {
    let currentLang = getI18n().resolvedLanguage;
    let newDate;
    if (currentLang === "fr") {
      newDate = Moment(date)
        .format("dddd Do MMMM YYYY, h:mm a")
        .replace(/(\d)(er)/g, "$1<sup>$2</sup>");
    } else {
      newDate = Moment(date)
        .format("dddd MMMM Do YYYY, h:mm a")
        .replace(/(\d)(st|nd|rd|th)/g, "$1<sup>$2</sup>");
    }
    return newDate.charAt(0).toUpperCase() + newDate.slice(1);
  };

  const packageHistoryJSX = trackingDetails.Events ? (
    [...trackingDetails.Events]
      .filter((Event) => validCodes.includes(Event.Type.Code))
      .reverse()
      .map(function (Event, index) {
        // Do not display 2 identical events in a row, except for ADL, only show latest
        // https://aircanada.atlassian.net/browse/CDE-3079
        if (lastTrackingCode !== Event.Type.Code || Event.Type.Code === "ADL") {
          lastTrackingCode = Event.Type.Code;
          return (
            <li key={index} className={"code-" + Event.Type.Code}>
              <CheckIcon className="check-icon" />
              {Event.Type.Code !== "BKD" ? (
                <div className="history-event-time">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: dateCapitalized(Event.Timestamp)
                    }}
                  />
                  {t(
                    "tracking-results.package-history.list.history-date-location"
                  )}
                  {/* Events Code that are already at destination use consignee location instead of airport code for location */}
                  {arrivedAtConsigneeLocation(Event.Type.Code) ? (
                    <>
                      {" "}
                      {trackingDetails.participants[1].city
                        .charAt(0)
                        .toUpperCase() +
                        trackingDetails.participants[1].city
                          .slice(1)
                          .toLowerCase()}
                    </>
                  ) : (
                    <>
                      {" "}
                      {t(
                        "tracking-results.package-history.list.destination-city." +
                          Event.Location.Airport.Code.substring(0, 3)
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="history-event-time">
                  {/* bkdEvent */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: dateCapitalized(Event.Timestamp)
                    }}
                  />
                </div>
              )}
              {/* check for special truck or flight segment case */}
              {(Event.Type.Code === "RCF" || Event.Type.Code === "DEP") ? (
                <>
                  {Event.Segment.FlightNumber.endsWith("T") ? (
                    <>
                      {/* localDelivery */}
                      {Event.Segment.Destination === "" ? (
                        <div className="history-event-description">
                          {t(
                            "tracking-results.package-history.list.history-description-empty." +
                              Event.Type.Code
                          )}
                        </div>
                      ) : (
                        <div>
                          {/* continue */}
                          {hasNumber(Event.Segment.Destination) ? (
                            <div className="history-event-description">
                              {/* Local warehouse delivery  */}
                              {t(
                                "tracking-results.package-history.list.history-description-addition-installations." +
                                  Event.Type.Code
                              )}
                            </div>
                          ) : (
                            <div className="history-event-description">
                              {/* Local airport delivery */}
                              {t(
                                "tracking-results.package-history.list.history-description-addition-airport." +
                                  Event.Type.Code
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {!hasNumber(Event.Segment.Destination) && (
                        <>
                          {/* Empty Destination (could be RTS, ADL, GDL, etc) */}
                          {Event.Segment.Destination === "" ? (
                            <div className="history-event-description">
                              {t(
                                "tracking-results.package-history.list.history-description-empty." +
                                  Event.Type.Code
                              )}
                            </div>
                          ) : (
                            <>
                              {/* flightDelivery */}
                              {/* To airport for a flight delivery  */}
                              <div className="history-event-description">
                                {t(
                                  "tracking-results.package-history.list.history-description." +
                                    Event.Type.Code
                                )}{" "}
                                {t(
                                  "tracking-results.package-history.list.destination-city." +
                                    Event.Segment.Destination.substring(0, 3)
                                )}
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* everything else goes here */}
                  <div className="history-event-description">
                    {t(
                      "tracking-results.package-history.list.history-description." +
                        Event.Type.Code
                    )}
                  </div>
                </>
              )}
            </li>
          );
        } else {
          return "";
        }
      })
  ) : (
    <li>Nothing to show!</li>
  );

  return (
    <HistoryList>
      <div className="shipment-details-title">
        {t("tracking-results.shipping-details.header.history")}
      </div>
      <ul>{packageHistoryJSX}</ul>
    </HistoryList>
  );
}

export default ShipmentsRowHistoryTab;
