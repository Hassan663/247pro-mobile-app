import { Endpoint } from '../../modals';
import BASE_URL from '../base/base-url';

// Interface for an endpoint
// Function to create an endpoint object with JWTToken property
const createEndpoint = (endpoint: string, JWTToken: boolean): Endpoint => ({
  url: `${BASE_URL}${endpoint}`,
  JWTToken,
});
const createEndpointWithoutBaseUrl = (endpoint: string, JWTToken: boolean): Endpoint => ({
  url: `${endpoint}`,
  JWTToken,
});
console.log(BASE_URL,'BASE_URL')
// AUTHENTICATION ENDPOINTS
export const LOGIN_ENCRIPTION_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/api/system/encryption/encode`, false);
export const LOGIN_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/api/auth/login`, false);
export const SIGNUP_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/api/auth/register`, false);
export const MEMBERSHIP_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/accounts`, false);
export const LOGIN_IDENTITY_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/api/account/identity`, false);
export const FORGET_PASSWORD_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/api/auth/forgot-password`, false);
export const LOGOUT_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/api/auth/logout`, false);
export const USER_ENDPOINT: Endpoint = createEndpoint('/api/user', true);
export const POST_ENDPOINT: Endpoint = createEndpoint('/api/posts', true);
export const CHECKOUT_ENDPOINT: Endpoint = createEndpoint('/api/checkout', true);
export const ITEMDETAIL_ENDPOINT: Endpoint = createEndpoint('/api/itemdetail', true);
export const ITEMHISTORY_ENDPOINT: Endpoint = createEndpoint('/api/itemhistory', true);
export const BIDCOST_ENDPOINT: Endpoint = createEndpoint('/api/bidcost', true);
// AUTHENTICATION ENDPOINTS

// APP ENDPOINTS
export const CONTACT_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/application-api/v1/contacts`, false);
export const CONTACT_SPECIALITIES: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/membership-api/v1/specialities`, false);
export const CREATE_CONTACT_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/application-api/v1/contacts`, false);
export const UPLOAD_IMAGE_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl(`${BASE_URL}/api/contacts/upload/profile-image`, false);
// APP ENDPOINTS
// Rest of the code remains the same