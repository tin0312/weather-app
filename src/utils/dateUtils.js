import moment from "moment";
export const formattedDate = (time_stamp) => {
    return moment.unix(time_stamp).utc().format("ddd, D MMM");
}