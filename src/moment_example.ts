const moment = require("moment");

moment.locale("ko");

const DateFormat = {
  // TIME
  TIME_WITHOUT_SECONDS: "HH:mm", // 22:09
  TIME_WITHOUT_SECONDS_LANG: "LT", // 오후 10:09
  TIME_WITHOUT_SECONDS_LANG_HM: "HH시 mm분", // 22시 09분, TODO : 언어팩 고려해야 한다.
  TIME_WITH_SECONDS: "HH:mm:ss", // 22:09:40
  TIME_WITH_SECONDS_LANG: "LTS", // 오후 10:09:40
  TIME_WITH_SECONDS_LANG_HMS: "HH시 mm분 ss초", // 22시 09분 40초, TODO : 언어팩 고려해야 한다.
  // DATE
  DATE: "L", // 2022.10.18.
  DATE_DOT_SPACE: "YYYY. MM. DD.", // 2022. 10. 18.
  DATE_SLASH: "YYYY/MM/DD", // 2022/10/18
  DATE_DASH: "YYYY-MM-DD", // 2022-10-18
  DATE_LANG: "LL", // 2022년 10월 18일
  // DATE + DAY
  get DATE_DOT_SPACE_DAY_LANG() {
    return this.DATE_DOT_SPACE + " dddd";
  },
  get DATE_SLASH_DAY_LANG() {
    return this.DATE_SLASH + " dddd";
  },
  get DATE_DASH_DAY_LANG() {
    return this.DATE_DASH + " dddd";
  },
  get DATE_DAY_LANG() {
    return this.DATE_LANG + " dddd";
  },
  // DATE + TIME
  DATE_TIME_LANG: "LLL", // 2022년 10월 18일 오후 10:09
  DATE_TIME_DAY_LANG: "LLLL", // 2022년 10월 18일 화요일 오후 10:09
  // YMD
  YMD: "YYYYMMDD", // 20221018
  YMD_HMS: "YYYYMMDDHHmmss", // 20221018220940
};

// 1. Parse
console.log("1. Parse");
console.log(moment("202210182000", DateFormat.YMD_HMS));
console.log(moment("20221018", DateFormat.YMD));
console.log(moment("2022/10/18", DateFormat.DATE_SLASH));
console.log(moment("2022.10.18.", DateFormat.DATE));
console.log(moment("2022-10-18", DateFormat.DATE_DASH));
console.log(moment("2022년 10월 18일", DateFormat.DATE_LANG));

// 2. Display
console.log("2. Display");
console.log("[ TIME ]");
console.log(moment().format(DateFormat.TIME_WITHOUT_SECONDS));
console.log(moment().format(DateFormat.TIME_WITHOUT_SECONDS_LANG));
console.log(moment().format(DateFormat.TIME_WITHOUT_SECONDS_LANG_HM));
console.log(moment().format(DateFormat.TIME_WITH_SECONDS));
console.log(moment().format(DateFormat.TIME_WITH_SECONDS_LANG));
console.log(moment().format(DateFormat.TIME_WITH_SECONDS_LANG_HMS));

console.log("[ DATE ]");
console.log(moment().format(DateFormat.DATE));
console.log(moment().format(DateFormat.DATE_DOT_SPACE));
console.log(moment().format(DateFormat.DATE_SLASH));
console.log(moment().format(DateFormat.DATE_DASH));
console.log(moment().format(DateFormat.DATE_LANG));

console.log("[ DATE + DAY ]");
console.log(moment().format(DateFormat.DATE_DOT_SPACE_DAY_LANG));
console.log(moment().format(DateFormat.DATE_SLASH_DAY_LANG));
console.log(moment().format(DateFormat.DATE_DASH_DAY_LANG));
console.log(moment().format(DateFormat.DATE_DAY_LANG));

console.log("[ DATE + TIME ]");
console.log(moment().format(DateFormat.DATE_TIME_LANG));
console.log(moment().format(DateFormat.DATE_TIME_DAY_LANG));

console.log("[ YMD ]");
console.log(moment().format(DateFormat.YMD));
console.log(moment().format(DateFormat.YMD_HMS));
