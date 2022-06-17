import { useState, useRef } from "react";
import { DatePickerStyle } from "./ShipmentsDatePicker.style";
import { useTranslation, getI18n } from "react-i18next";
import Moment from "moment";
import "moment/locale/fr";
import { DateRangePicker, CustomProvider } from "rsuite";
import { DateRange } from "rsuite/DateRangePicker";
import "rsuite/dist/rsuite.min.css";
import frCA from "date-fns/locale/fr-CA";
import enGB from "date-fns/locale/en-GB";
import DateRangeIcon from "@mui/icons-material/DateRange";

function ShipmentsDatePicker(props) {
  const { t } = useTranslation();
  const { startDate, endDate, dispatchList } = props;
  const maxDateRange = 31;
  const startDateDefault = Moment(startDate).toDate();
  const endDateDefault = Moment(endDate).toDate();
  const minDateDefault = Moment(Moment().subtract(6, "weeks")).toDate();
  const maxDateDefault = new Date();
  const { allowedMaxDays, combine, allowedRange } = DateRangePicker;
  const [dateValue, setDateValue] = useState<DateRange | null>([
    startDateDefault,
    endDateDefault
  ]);
  const refToScroll = useRef<HTMLDivElement>(null);

  const Calendar = {
    sunday: t("shipments-dashboard.date.day.sunday"),
    monday: t("shipments-dashboard.date.day.monday"),
    tuesday: t("shipments-dashboard.date.day.tuesday"),
    wednesday: t("shipments-dashboard.date.day.wednesday"),
    thursday: t("shipments-dashboard.date.day.thursday"),
    friday: t("shipments-dashboard.date.day.friday"),
    saturday: t("shipments-dashboard.date.day.saturday"),
    ok: t("shipments-dashboard.date.button.ok"),
    today: t("shipments-dashboard.date.text.today"),
    yesterday: t("shipments-dashboard.date.text.yesterday"),
    hours: t("shipments-dashboard.date.text.hours"),
    minutes: t("shipments-dashboard.date.text.minutes"),
    seconds: t("shipments-dashboard.date.text.seconds"),
    formattedMonthPattern: "MMMM yyyy",
    formattedDayPattern: t("shipments-dashboard.date.text.formattedDayPattern"), // have to keep the day and hide it or the calendar will bug when you change the month
    dateLocale: getI18n().resolvedLanguage === "fr" ? frCA : enGB
  };

  const locale = {
    Calendar,
    DatePicker: {
      ...Calendar
    },
    DateRangePicker: {
      ...Calendar,
      last7Days: t("shipments-dashboard.date.day.last7days"),
      last14Days: t("shipments-dashboard.date.day.last14days"),
      last31Days: t("shipments-dashboard.date.day.last31days")
    }
  };

  const divContainer = document.getElementsByClassName(
    "calendar-container"
  )[0] as HTMLElement;

  function handleDateValueChange(dates) {
    let newStartDate = Moment(dates[0]).format("YYYY-MM-DD");
    let newEndDate = Moment(dates[1]).format("YYYY-MM-DD");
    if (
      Moment(newStartDate, "YYYY-MM-DD", true).isValid() &&
      Moment(newEndDate, "YYYY-MM-DD", true).isValid()
    ) {
      dispatchList({
        type: "dates",
        startDateValue: newStartDate,
        endDateValue: newEndDate
      });
      setDateValue(dates);
    } else {
      console.log("calendar error");
    }
  }

  function handleCalendarOpen() {
    let mql = window.matchMedia("screen and (max-width: 768px)");
    if (mql.matches && refToScroll) {
      window.scrollTo({
        behavior: "auto",
        top: refToScroll?.current?.offsetTop
      });
    }
  }

  return (
    <DatePickerStyle ref={refToScroll} data-lang={getI18n().resolvedLanguage}>
      <label className="date-range-label">
        {t("shipments-dashboard.date.label.date-range")}
      </label>

      <CustomProvider locale={locale}>
        <DateRangePicker
          value={dateValue}
          onChange={handleDateValueChange}
          onOpen={handleCalendarOpen}
          appearance="subtle"
          className="date-range-custom"
          size="lg"
          format="dd-MM-yyyy" //yyyy-MM-dd
          character=" &#8212; "
          caretAs={DateRangeIcon}
          cleanable={false}
          disabledDate={combine?.(
            allowedMaxDays?.(maxDateRange),
            allowedRange?.(minDateDefault, maxDateDefault)
          )}
          ranges={[
            {
              label: t("shipments-dashboard.date.day.last7days"),
              value: [Moment().subtract(6, "days").toDate(), Moment().toDate()]
            },
            {
              label: t("shipments-dashboard.date.day.last14days"),
              value: [Moment().subtract(13, "days").toDate(), Moment().toDate()]
            },
            {
              label: t("shipments-dashboard.date.day.last31days"),
              value: [Moment().subtract(30, "days").toDate(), Moment().toDate()]
            }
          ]}
          placement="bottomStart"
          placeholder={t("shipments-dashboard.date.text.formattedDayPattern")}
          showOneCalendar
          container={divContainer}
        />
        <div className="calendar-container"></div>
      </CustomProvider>
    </DatePickerStyle>
  );
}

export default ShipmentsDatePicker;
