export const checkFileExists = (file_path) => {
    let http = new XMLHttpRequest();

    http.open("HEAD", file_path, false);
    http.send();

    return http.status !== 404;
};