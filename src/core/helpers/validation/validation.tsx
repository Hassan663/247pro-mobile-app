import PhoneNumber, { CountryCode } from 'libphonenumber-js';
import { VALIDATIONMESSAGE } from "./validation-message";

const zipCodePattern = /^\d{5}$/;
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

export function phoneValidation(phone: string, countryCode: CountryCode): ValidationResult {
    const parsedPhoneNumber = PhoneNumber(phone, countryCode); // Replace 'US' with the appropriate country code.

    if (!phone) {
        return createErrorResponse(VALIDATIONMESSAGE[5]);
    }

    if (!parsedPhoneNumber?.isValid()) {
        return createErrorResponse(VALIDATIONMESSAGE[12]);
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

export function enterNameAndEmailValidation(name: string, email: string, password: string, comeFromVerifyCode: boolean): ValidationResult {
    if (comeFromVerifyCode) {
        if (!name || !password) return createErrorResponse(VALIDATIONMESSAGE[9]);
    }
    else {
        if (!name || !email || !password) return createErrorResponse(VALIDATIONMESSAGE[9]);

        let isValidEmail = emailValidation(email)

        if (isValidEmail.success == false) return createErrorResponse(VALIDATIONMESSAGE[10])
    }

    let isValidPassword = passwordValidation(password)

    if (isValidPassword.success == false) return isValidPassword

    return createSuccessResponse();

}

export function verifyCodeValidation(code: string,): ValidationResult {

    if (!code) return createErrorResponse(VALIDATIONMESSAGE[11]);

    else if (code.length !== 4) return createErrorResponse(VALIDATIONMESSAGE[11]);

    return createSuccessResponse();
}

export function buisnessQuestionsValidation(selectedIndustry: string, primarySpecialty: string, zipCode: string, jobType: string): ValidationResult {
    const isValidZipCode = zipCodePattern.test(zipCode);

    if (selectedIndustry && primarySpecialty && isValidZipCode) {
        if (selectedIndustry == 'Construction') {
            if (!jobType) return createErrorResponse(VALIDATIONMESSAGE[9]);
        }
        return createSuccessResponse();
    } else {
        return createErrorResponse(VALIDATIONMESSAGE[9]);
    }

}



export function newContactValidation(firstName: string): ValidationResult {
    if (!firstName) {
        return createErrorResponse(VALIDATIONMESSAGE[13]);
    }
    return createSuccessResponse();
}
