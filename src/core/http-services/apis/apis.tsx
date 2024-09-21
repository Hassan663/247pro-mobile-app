import { Endpoint } from '../../modals';
import BASE_URL from '../base/base-url';

// Interface for an endpoint
// Function to create an endpoint object with JWTToken property
const createEndpoint = (endpoint: string, JWTToken: boolean): Endpoint => ({
  url: `${'https://api.247pro.com'}${endpoint}`,
  JWTToken,
});

const createEndpointWithoutBaseUrl = (endpoint: string, JWTToken: boolean): Endpoint => ({
  url: `${endpoint}`,
  JWTToken,
});
console.log(BASE_URL, 'BASE_URL22222')

// AUTHENTICATION ENDPOINTS
export const LOGIN_ENCRIPTION_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/system/encryption/encode`, false);
export const LOGIN_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/auth/login`, false);
// export const LOGIN_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/auth/login`, false);
export const SIGNUP_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/auth/register`, false);
export const MEMBERSHIP_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/membership-api/v1/accounts`, false);
export const LOGIN_IDENTITY_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/account/identity`, false);
// https://api.247pro.com/api/auth/google-external-login
export const ENTERNAL_LOGIN: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/auth/google-external-login`, false);
export const FORGET_PASSWORD_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/auth/forgot-password`, false);
export const LOGOUT_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/auth/logout`, false);
export const USER_ENDPOINT: Endpoint = createEndpoint('/api/user', true);
export const POST_ENDPOINT: Endpoint = createEndpoint('/api/posts', true);
export const CHECKOUT_ENDPOINT: Endpoint = createEndpoint('/api/checkout', true);
export const ITEMDETAIL_ENDPOINT: Endpoint = createEndpoint('/api/itemdetail', true);
export const ITEMHISTORY_ENDPOINT: Endpoint = createEndpoint('/api/itemhistory', true);
export const BIDCOST_ENDPOINT: Endpoint = createEndpoint('/api/bidcost', true);
// AUTHENTICATION ENDPOINTS

// APP ENDPOINTS
export const CONTACT_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/application-api/v1/contacts`, false);
export const CONTACT_SPECIALITIES: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/membership-api/v1/specialities`, false);
export const CREATE_CONTACT_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/application-api/v1/contacts`, false);
export const UPLOAD_IMAGE_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${'https://api.247pro.com'}/api/contacts/upload/profile-image`, false);
// APP ENDPOINTS

// OnBoarding Endpoints
export const INDUSTORY_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/industries/account`, false);
export const CREATE_INDUSTORY_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/industries/account`, false);

export const PRIMARY_SPECIALITY_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/specialities/account/industry`, false);
export const CREATE_PRIMARY_SPECIALITY_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/specialities/account`, false);

export const JOB_TYPE_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/job-types/industry`, false);

export const ZIP_PHONE_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/accounts/zip-and-phone`, false);
export const SUBMIT_JOB_LEAD_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/accounts/job-leads`, false);
