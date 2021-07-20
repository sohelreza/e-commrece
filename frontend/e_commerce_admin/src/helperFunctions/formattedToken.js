export const getFormattedToken = (token) => {
    const formattedToken = {
        headers: {
            "x-auth-token": token,
        },
    };

    return formattedToken;
};