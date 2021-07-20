export const uniqueId = {
    id() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        const id = "_" + Math.random().toString(36).substr(2, 9);
        // console.log(id);
        return id;
    },
};