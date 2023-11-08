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

export const LOGIN_ENCRIPTION_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl('https://apidevprofinder.247pro.com/api/system/encryption/encode', false);
export const LOGIN_ENDPOINT: Endpoint = createEndpointWithoutBaseUrl('https://apidevprofinder.247pro.com/api/auth/login', false);
export const USER_ENDPOINT: Endpoint = createEndpoint('/api/user', true);
export const POST_ENDPOINT: Endpoint = createEndpoint('/api/posts', true);
export const CHECKOUT_ENDPOINT: Endpoint = createEndpoint('/api/checkout', true);
export const ITEMDETAIL_ENDPOINT: Endpoint = createEndpoint('/api/itemdetail', true);
export const ITEMHISTORY_ENDPOINT: Endpoint = createEndpoint('/api/itemhistory', true);
export const BIDCOST_ENDPOINT: Endpoint = createEndpoint('/api/bidcost', true);
// Rest of the code remains the same
