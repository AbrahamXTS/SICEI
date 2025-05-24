import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const getBasicDate = (date?: dayjs.ConfigType) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getFullSpanishDate = (date: dayjs.ConfigType) => {
  return dayjs.utc(date).locale("es-mx").format("dddd, D [de] MMMM [del] YYYY");
};
