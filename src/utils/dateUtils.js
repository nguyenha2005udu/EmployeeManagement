//import moment from "moment";
//
//export const dateUtils = {
//  // Format date string to display
//  formatDate: (date) => {
//    if (!date) return "";
//    return moment(date).format("DD/MM/YYYY");
//  },
//
//  // Format time string to display
//  formatTime: (time) => {
//    if (!time) return "";
//    return moment(time).format("HH:mm:ss");
//  },
//
//  // Convert date for API
//  toAPIDate: (date) => {
//    if (!date) return null;
//    return moment(date).format("YYYY-MM-DD");
//  },
//
//  // Parse date from API
//  fromAPIDate: (dateString) => {
//    if (!dateString) return null;
//    return moment(dateString);
//  },
//
//  // Check if date is valid
//  isValidDate: (date) => {
//    return date && moment(date).isValid();
//  },
//
//  // Get current date
//  getCurrentDate: () => {
//    return moment();
//  },
//
//  // Calculate date difference
//  dateDiff: (startDate, endDate) => {
//    if (!startDate || !endDate) return 0;
//    return moment(endDate).diff(moment(startDate), "days") + 1;
//  },
//
//  // Format date range
//  formatDateRange: (startDate, endDate) => {
//    if (!startDate || !endDate) return "";
//    return `${moment(startDate).format("DD/MM/YYYY")} - ${moment(
//      endDate
//    ).format("DD/MM/YYYY")}`;
//  },
//
//  // Get start of month
//  getStartOfMonth: () => {
//    return moment().startOf("month");
//  },
//
//  // Get end of month
//  getEndOfMonth: () => {
//    return moment().endOf("month");
//  },
//
//  // Check if date is weekend
//  isWeekend: (date) => {
//    return moment(date).day() === 0 || moment(date).day() === 6;
//  },
//
//  // Get week days
//  getWeekDays: () => {
//    return moment.weekdays();
//  },
//};
