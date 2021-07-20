export const formValidation = {
    checkType(state, name, value) {
        if (name === "phone") {
            return this.phoneNumberValidation(state, name, value);
        } else if (
            name === "categoryName" ||
            name === "subcategoryName" ||
            name === "brandName" ||
            name === "productName" ||
            name === "productDescription" ||
            name === "productOverview" ||
            name === "productUnit"
        ) {
            return this.nameValidation(state, name, value);
        } else if (name === "email") {
            return this.emailValidation(state, name, value);
        } else if (
            name === "productPrice" ||
            name === "productStock" ||
            name === "productDiscountPercentage" ||
            name === "productDiscountPrice"
        ) {
            return this.floatValidation(state, name, value);
        } else if (
            name === "password" ||
            name === "oldPassword" ||
            name === "newPassword" ||
            name === "confirmPassword"
        ) {
            return this.passwordValidation(state, name, value);
        } else if (name === "firstname") {
            return this.firstNameValidation(state, name, value);
        } else if (name === "lastname") {
            return this.lastNameValidation(state, name, value);
        } else if (name === "dietName") {
            return this.dietNameValidation(state, value);
        } else if (name === "dietQuantity") {
            return this.dietQuantityValidation(state, value);
        } else if (name === "dietUnit") {
            return this.dietUnitValidation(state, value);
        } else if (name === "dietCalorie") {
            return this.dietCalorieValidation(state, value);
        } else if (name === "exerciseName") {
            return this.exerciseNameValidation(state, value);
        } else if (name === "exerciseDescription") {
            return this.exerciseDescriptionValidation(state, value);
        } else if (name === "expenseName") {
            return this.expenseNameValidation(state, value);
        } else {
            return state;
        }
    },

    emailValidation(state, name, value) {
        let error = [];

        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!value.match(emailRegex)) {
            error.push("This is not a valid email");
        }

        let data = {...state, [name]: value, errorStatus: null };

        if (name === "email") {
            data = {
                ...data,
                emailError: error,
            };
        } else {
            data = {
                ...data,
            };
        }

        return data;
    },

    phoneNumberValidation(state, name, value) {
        let error = [];
        const phoneNumberRegex = /^[+]?\d*$/;

        if (!value.match(phoneNumberRegex)) {
            error.push("This is not a valid phone number");
        }

        if (value.length !== 11) {
            error.push("Phone Number must contain 11 digits");
        }

        const data = {
            ...state,
            [name]: value,
            phoneError: error,
            errorStatus: null,
        };

        return data;
    },

    passwordValidation(state, name, value) {
        let error = [];

        if (value.length < 6) {
            error.push("Minimum 6 characters are required");
        }

        let data = {...state, [name]: value, errorStatus: null };

        if (name === "password") {
            data = {
                ...data,
                passwordError: error,
            };
        } else if (name === "oldPassword") {
            data = {
                ...data,
                oldPasswordError: error,
            };
        } else if (name === "newPassword") {
            data = {
                ...data,
                newPasswordError: error,
            };
        } else if (name === "confirmPassword") {
            data = {
                ...data,
                confirmPasswordError: error,
            };
        } else {
            data = {
                ...data,
            };
        }

        return data;
    },

    nameValidation(state, name, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("This is a required field");
        }

        let data = {...state, errorStatus: null };
        // productUnit
        if (
            name === "categoryName" ||
            name === "subcategoryName" ||
            name === "brandName" ||
            name === "productName"
        ) {
            data = {
                ...data,
                name: value,
                nameError: error,
            };
        } else if (name === "productDescription") {
            data = {
                ...data,
                description: value,
                descriptionError: error,
            };
        } else if (name === "productOverview") {
            data = {
                ...data,
                overview: value,
                overviewError: error,
            };
        } else if (name === "productUnit") {
            data = {
                ...data,
                unit: value,
                unitError: error,
            };
        } else {
            data = {
                ...data,
            };
        }

        return data;
    },

    floatValidation(state, name, value) {
        let error = [];

        const floatNumberRegex = /^\d*(\.\d+)?$/;

        if (!value.match(floatNumberRegex)) {
            error.push("This is not a valid input");
        }
        // productDiscountPrice
        let data = {...state, errorStatus: null };

        if (name === "productPrice") {
            data = {
                ...data,
                price: value,
                priceError: error,
            };
        } else if (name === "productStock") {
            data = {
                ...data,
                stock: value,
                stockError: error,
            };
        } else if (name === "productDiscountPercentage") {
            data = {
                ...data,
                discountPercentage: value,
                discountPercentageError: error,
            };
        } else if (name === "productDiscountPrice") {
            data = {
                ...data,
                discountPrice: value,
                discountPriceError: error,
            };
        } else {
            data = {
                ...data,
            };
        }

        return data;
    },

    firstNameValidation(state, name, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid first name");
        }

        const data = {
            ...state,
            [name]: value,
            firstnameError: error,
            errorStatus: null,
        };

        return data;
    },

    lastNameValidation(state, name, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid last name");
        }

        const data = {
            ...state,
            [name]: value,
            lastnameError: error,
            errorStatus: null,
        };

        return data;
    },

    dietNameValidation(state, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid diet item name");
        }

        const data = {
            ...state,
            name: value,
            nameError: error,
            errorStatus: null,
        };

        return data;
    },

    dietQuantityValidation(state, value) {
        let error = [];
        const onlyNumberRegex = /^[+]?\d*$/;

        if (!value.match(onlyNumberRegex) || value.trim() === "") {
            error.push("Please give a valid quantity");
        }

        const data = {
            ...state,
            quantity: value,
            quantityError: error,
            errorStatus: null,
        };

        return data;
    },

    dietUnitValidation(state, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid unit");
        }

        const data = {
            ...state,
            unit: value,
            unitError: error,
            errorStatus: null,
        };

        return data;
    },

    dietCalorieValidation(state, value) {
        let error = [];
        const onlyNumberRegex = /^[+]?\d*$/;

        if (!value.match(onlyNumberRegex) || value.trim() === "") {
            error.push("Please give a valid calorie");
        }

        const data = {
            ...state,
            calorie: value,
            calorieError: error,
            errorStatus: null,
        };

        return data;
    },

    exerciseNameValidation(state, value) {
        let error = [];

        if (value.trim() === "") {
            error.push("Please give a valid exercise name");
        }

        const data = {
            ...state,
            name: value,
            nameError: error,
            errorStatus: null,
        };

        return data;
    },
};