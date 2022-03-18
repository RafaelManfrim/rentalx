import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  dateNow() {
    return dayjs().toDate();
  }

  convertToUTC(date: Date) {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date) {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  compareInDays(start_date: Date, end_date: Date) {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  addDays(date: Date, days: number) {
    const date_utc = this.convertToUTC(date);
    return dayjs(date_utc).add(days, "days").toDate();
  }
}
