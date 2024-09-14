import PhoneNumber, { CountryCode } from 'libphonenumber-js';
import { VALIDATIONMESSAGE } from "./validation-message";
import { t } from 'i18next';

const zipCodePattern = /^\d{5}$/;
const phonePattern: RegExp = /^\d{7,15}$/;
const emailPattern: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

type ValidationResult = { success: boolean; message: string, type?: string };

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
    else if (!password) {
        return createErrorResponse(VALIDATIONMESSAGE[1]);
    }

    if (emailPattern.test(emailOrPhone)) {
        if (emailOrPhone.includes('@example.com')) {
            return createErrorResponse(VALIDATIONMESSAGE[2]);
        }
    } else if (!phonePattern.test(emailOrPhone)) {
        return createErrorResponse(VALIDATIONMESSAGE[3]);
    }

    if (password && !password.match(passwordRegex)) {
        return createErrorResponse(VALIDATIONMESSAGE[4]);
    }

    return createSuccessResponse();
}

export function emailValidation(email: string): ValidationResult {
    // Check if the email is empty
    if (!email) {
        return createErrorResponse(VALIDATIONMESSAGE[0]); // 'Email is required' message
    }

    // Check if the email matches the defined pattern
    if (!emailPattern.test(email)) {
        return createErrorResponse(VALIDATIONMESSAGE[10]); // 'Invalid email format' message
    }

    // Check if the email domain is '@example.com' which is not allowed
    if (email.includes('@example.com')) {
        return createErrorResponse(VALIDATIONMESSAGE[3]); // 'Emails from @example.com are not allowed' message
    }

    // If all checks pass, return success response
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

    if (!password1.match(passwordRegex)
        // || !password2.match(passwordRegex)
    ) {
        return createErrorResponse(VALIDATIONMESSAGE[4]);
    }

    // if (password1
    //      !== password2) {
    //     return createErrorResponse(VALIDATIONMESSAGE[8]);
    // }

    return createSuccessResponse();
}

export function enterNameAndEmailValidation(name: string, email: string, password: string, comeFromVerifyCode: boolean): ValidationResult {
    if (comeFromVerifyCode) {
        if (!name || !password) return { ...createErrorResponse(VALIDATIONMESSAGE[9]), type: 'all' };
    }
    else {
        if (!name || !email || !password) return { ...createErrorResponse(VALIDATIONMESSAGE[9]), type: 'all' };

        let isValidEmail = emailValidation(email)

        if (isValidEmail.success == false) return { ...createErrorResponse(VALIDATIONMESSAGE[10]), type: t('Email') }
    }

    let isValidPassword = { ...passwordValidation(password), type: t('SetAPassword') }

    if (isValidPassword.success == false) return isValidPassword

    return createSuccessResponse();

}

export function verifyCodeValidation(code: string,): ValidationResult {

    if (!code) return createErrorResponse(VALIDATIONMESSAGE[11]);

    else if (code.length !== 6) return createErrorResponse(VALIDATIONMESSAGE[11]);

    return createSuccessResponse();
}

export function buisnessQuestionsValidation(
    selectedIndustry: string,
    primarySpecialty: string,
    jobType: string,
): ValidationResult {
    //   const isValidZipCode = zipCodePattern.test(zipCode);
    if (selectedIndustry && primarySpecialty) {
        if (selectedIndustry === 'Construction') {
            if (!jobType) {
                return createErrorResponse(VALIDATIONMESSAGE[9]);
            }
        }
        return createSuccessResponse();
    } else {
        return createErrorResponse(VALIDATIONMESSAGE[9]);
    }
}

export function zipAndPhoneValidation(
    zipCode: string,
    phone: string,
    countryCode: CountryCode,
): ValidationResult {
    const isValidZipCode = zipCodePattern.test(zipCode);
    const isPhoneNumberValid = phoneValidation(phone, countryCode);
    if (isValidZipCode && isPhoneNumberValid) {
        return createSuccessResponse();
    } else {
        return createErrorResponse(VALIDATIONMESSAGE[14]);
    }
}



export function newContactValidation(firstName: string): ValidationResult {
    if (!firstName) {
        return createErrorResponse(VALIDATIONMESSAGE[13]);
    }
    return createSuccessResponse();
}
