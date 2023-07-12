import BASE_URL from '../base/base-url';

const createEndpoint = (endpoint: string) => `${BASE_URL}${endpoint}`;

export const LOGIN_ENDPOINT = createEndpoint('/api/login');
export const USER_ENDPOINT = createEndpoint('/api/user');
export const POST_ENDPOINT = createEndpoint('/api/posts');