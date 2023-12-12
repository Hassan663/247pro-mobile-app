
// export type LoginModal = {
//     email?: string;
//     password?: string;
// };
export interface LoginModal {
  key: string;
  object: {
    email: string;
    password: string;
  };
}
export interface SignUpModal {
  key: string;
  object: {
    name: string;
    email: string;
    password: string;
  };
}
export interface MemberShipApiModal {
  logPromotion?: string,
  logReferral?: string,
  accountId: string,
  identityUserId: string,
  userName?: string,
  userEmail: string
}
export interface UserIdentity {
  accessToken: string;
}
export interface ForgetModal {
  email: string;
}

// LoginResponseData type
export interface IForgetResponseData {

}
export interface ISignupResponseData {
  "identityUserId": string, // Identity ID
  "userId": string, // User ID
  "accountId": string, // Account ID
  "active": boolean, // Indication active login credential
  "email": string, // User email
  "roles": string[], // Array of assigned roles
  "isRegister": boolean,
  "userName": string, // User name
  "impersonating": boolean, // Indicating impersonated user
  "accessToken": string, // Access token
  "accessTokenExpiration": string, // Access token expiration date
  "forceToResetPassword": boolean, // Forcing user to reset the password
  "resetPasswordToken": string // Token will be used to reset password
}
export interface ILoginResponseData {
  id: string;
  userId: string;
  accountId: string;
  createdDate: string; // Should be formatted as date-time
  userName: string | null; // Use union type with null for nullable properties
  email: string | null;
  normalizedUserName: string | null;
  normalizedEmail: string | null;
  emailConfirmed: boolean | null;
  passwordHash: string | null;
  securityStamp: string | null;
  concurrencyStamp: string | null;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean | null;
  twoFactorEnabled: boolean | null;
  lockOutEnabled: boolean | null;
  lockOutEnd: string | null; // Should be formatted as date-time
  accessFailedCount: number | null; // Use number type for integer properties
  forceToResetPassword: boolean | null;
  active: boolean | null;
  name: string | null;
  refreshTokens: any[]; // Update this with the correct type if possible
  userClaims: any[]; // Update this with the correct type if possible
  userLogins: any[]; // Update this with the correct type if possible
  userTokens: any[]; // Update this with the correct type if possible
  roles: any[]; // Update this with the correct type if possible
  userRoles: any[]; // Update this with the correct type if possible
  identityHistories: any[]; // Update this with the correct type if possible
}