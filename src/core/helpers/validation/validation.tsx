import { VALIDATIONMESSAGE } from "./validation-message";

const phonePattern: RegExp = /^\d{7,15}$/;
const emailPattern: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

type ValidationResult = { success: boolean; message: string };

function createErrorResponse(message: string): ValidationResult {
    return { success: false, message };
}

function createSuccessResponse(): ValidationResult {
    return { success: true, message: '' };
}

export function loginValidation(emailOrPhone: string, password: string): ValidationResult {
    if (!emailOrPhone) {
        return createErrorResponse(VALIDATIONMESSAGE[0]);
    }

    if (!password) {
        return createErrorResponse(VALIDATIONMESSAGE[1]);
    }

    if (emailPattern.test(emailOrPhone)) {
        if (emailOrPhone.includes('@example.com')) {
            return createErrorResponse(VALIDATIONMESSAGE[2]);
        }
    } else if (!phonePattern.test(emailOrPhone)) {
        return createErrorResponse(VALIDATIONMESSAGE[3]);
    }

    if (!password.match(passwordRegex)) {
        return createErrorResponse(VALIDATIONMESSAGE[4]);
    }

    return createSuccessResponse();
}

export function emailValidation(email: string): ValidationResult {
    if (!email) {
        return createErrorResponse(VALIDATIONMESSAGE[0]);
    }

    if (emailPattern.test(email)) {
        if (email.includes('@example.com')) {
            return createErrorResponse(VALIDATIONMESSAGE[2]);
        }
        return createSuccessResponse();
    } else if (!phonePattern.test(email)) {
        return createErrorResponse(VALIDATIONMESSAGE[3]);
    }

    return createSuccessResponse();
}

export function phoneValidation(phone: string): ValidationResult {
    if (!phone) {
        return createErrorResponse(VALIDATIONMESSAGE[5]);
    }

    if (!phonePattern.test(phone)) {
        return createErrorResponse(VALIDATIONMESSAGE[6]);
    }

    return createSuccessResponse();
}

export function passwordValidation(password: string): ValidationResult {
    if (!password) {
        return createErrorResponse(VALIDATIONMESSAGE[1]);
    }

    if (!password.match(passwordRegex)) {
        return createErrorResponse(VALIDATIONMESSAGE[4]);
    }

    return createSuccessResponse();
}

export function setUpPasswordValidation(password1: string, password2: string): ValidationResult {
    if (!password1 || !password2) {
        return createErrorResponse(VALIDATIONMESSAGE[7]);
    }

    if (!password1.match(passwordRegex) || !password2.match(passwordRegex)) {
        return createErrorResponse(VALIDATIONMESSAGE[4]);
    }

    if (password1 !== password2) {
        return createErrorResponse(VALIDATIONMESSAGE[8]);
    }

    return createSuccessResponse();
}
