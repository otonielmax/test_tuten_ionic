import { UserRole } from './user-role';
export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    active: boolean;
    agreedToTermsOfUse: boolean;
    appVersion: string;
    domain: string;
    email: string;
    estatus: string;
    funds: number;
    lastLogin: number;
    passwordHash: string;
    phoneNumber: string;
    photoExt: string;
    photoPath: string;
    referrer: string;
    rut: string;
    serviceData: string;
    sessionTokenBck: string;
    sessionTokenCli: string;
    sessionTokenPro: string;
    sessionTokenWeb: string;
    sync: number;
    userId: string;
    userRole: UserRole;
}