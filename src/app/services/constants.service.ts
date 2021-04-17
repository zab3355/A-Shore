import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

//#region Constants
const TOKEN = 'token';
const LOGINTOKEN = 'account';
const USERNAME = 'username';
const ID = 'id';
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

// Token for calls (Get/Set/Clear)
  static getToken() {
    const token = sessionStorage.getItem(TOKEN);
    if (token) {
      return token;
    } else {
      return '';
    }
  }
  static saveToken(token: string) {
    sessionStorage.setItem(TOKEN, token);
  }
  static deleteToken() {
    sessionStorage.removeItem(TOKEN);
  }

    static logout() {
      sessionStorage.removeItem('access_token');
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

    static setUserInfo(user){
      sessionStorage.setItem(USERNAME, user.username);
      sessionStorage.setItem(ID, user.codeTotal);
    }

    static getUsername() {
      return sessionStorage.getItem(USERNAME);
    }
    static getID() {
      return sessionStorage.getItem(ID);
    }

    loggedIn() {
      if (sessionStorage.getItem(TOKEN) != null) {
        console.log(sessionStorage.getItem('access_token'));
        console.log('yep');
        return true;
      }
      console.log('nah');
    }

}