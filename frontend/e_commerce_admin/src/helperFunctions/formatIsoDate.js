export const getFormattedIsoDate = (date) => {
    let month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const newDate = new Date(date);

    const formattedDate = {
        year: newDate.getFullYear(),
        month: month[newDate.getMonth()],
        date: newDate.getDate() <= 9 ? "0" + newDate.getDate() : newDate.getDate(),
        day: days[newDate.getDay()],
        hour: newDate.getHours() <= 9 ? "0" + newDate.getHours() : newDate.getHours(),
        minute: newDate.getMinutes() <= 9 ?
            "0" + newDate.getMinutes() :
            newDate.getMinutes(),
        second: newDate.getSeconds() <= 9 ?
            "0" + newDate.getSeconds() :
            newDate.getSeconds(),
        miliSecond: newDate.getMilliseconds(),
    };

    return formattedDate;
};