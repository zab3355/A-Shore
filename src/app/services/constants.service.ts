import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

//#region Constants
const JWT = 'jwt';
const LOGINTOKEN = 'LoginToken';
//#endregion

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {

    //#region URL Gets
    static getApiUrl() {
        return environment.url;
    }
    //#endregion

    //#region JWT Calls
    static getJWT() {
        const token = sessionStorage.getItem(JWT);
        if (token) {
            return token;
        } else {
            return '';
        }
    }
    //#endregion

    static setLoginToken(jwt) {
        sessionStorage.setItem(LOGINTOKEN, jwt);
    }

    static deleteToken() {
        sessionStorage.removeItem(JWT);
    }
    static logout() {
        sessionStorage.clear();
    }

    static getLoginToken() {
        const token = sessionStorage.getItem(LOGINTOKEN);
        if (token) {
            return token;
        } else {
            return '';
        }
    }

    loggedIn() {
        return !!sessionStorage.getItem('LoginToken');
    }
}