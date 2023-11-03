export const loginValidation = (email: any, password: any) => {
    const phonePattern = /^\d{7,15}$/; // Minimum 7 digits, maximum 15 digits
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    if (email === '') {
        return {
            success: false,
            message: 'please enter your email or phone number',
        };
    } else if (password === '') {
        return {
            success: false,
            message: 'please enter password',
        };
    }
    if (emailPattern.test(email)) {
        if (email.includes('@example.com')) {
            return {
                success: false,
                message: 'Email addresses from example.com are not allowed.',
            };
        }
    } else if (!phonePattern.test(email)) {
        return {
            success: false,
            message: 'Invalid email or phone number format.',
        };
    }
    if (!password.match(passwordRegex)) {
        return {
            success: false,
            message: 'Password must be 8+ characters with 1 letter and 1 number.',
        };
    } else {
        return {
            success: true,
            message: '',
        };
    }
};

export const emailValidation = (email: any) => {
    const phonePattern = /^\d{7,15}$/;
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (email === '') {
        return {
            success: false,
            message: 'please enter your email or phone number',
        };
    }
    if (emailPattern.test(email)) {
        if (email.includes('@example.com')) {
            return {
                success: false,
                message: 'Email addresses from example.com are not allowed.',
            };
        }
        return {
            success: true,
            message: '',
        };
    } else if (!phonePattern.test(email)) {
        return {
            success: false,
            message: 'Invalid email or phone number format.',
        };
    } else {
        return {
            success: true,
            message: '',
        };
    }
}

export const passwordValidation = (password: any) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    if (password === '') {
        return {
            success: false,
            message: 'please enter password',
        };
    } else if (!password.match(passwordRegex)) {
        return {
            success: false,
            message: 'Password must be 8+ characters with 1 letter and 1 number.',
        };
    } else {
        return {
            success: true,
            message: '',
        };
    }
}
export const setUpPasswordValidation = (password1: any, password2: any) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    if (password1 === '' || password2 === '') {
        return {
            success: false,
            message: 'Please enter both passwords.',
        };
    } else if (!password1.match(passwordRegex) || !password2.match(passwordRegex)) {
        return {
            success: false,
            message: 'Passwords must be 8+ characters with 1 letter and 1 number.',
        };
    } else if (password1 !== password2) {
        return {
            success: false,
            message: 'Passwords do not match.',
        };
    } else {
        return {
            success: true,
            message: '',
        };
    }
}