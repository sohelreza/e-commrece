export const getCurrentDateTime = () => {
    const currentDateTime = new Date().toISOString();
    // .setUTCHours(10);
    // .toISOString();
    // const a = new Date(currentDateTime).toISOString();
    // const d = currentDateTime.toISOString();
    // const e = d.setUTCHours(10);
    // console.log("current date time is", currentDateTime);
    return currentDateTime;
};