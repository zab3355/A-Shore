import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

//#region Constants
const TOKEN = 'token';
const USERNAME = 'username';
const CODE = 'code';
const LOCID = 'locid';
const ID = '_id';
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

    static setUserInfo(user){
      sessionStorage.setItem(USERNAME, user.username);
      sessionStorage.setItem(CODE, user.codeTotal);
      sessionStorage.setItem(LOCID, user.locId);
      sessionStorage.setItem(ID, user._id);
    }

    static getUsername() {
      return sessionStorage.getItem(USERNAME);
    }
    static getCode() {
      return sessionStorage.getItem(CODE);
    }

    static getLocId() {
      return sessionStorage.getItem(LOCID);
    }

    static getID() {
      return sessionStorage.getItem(ID);
    }
    
    loggedIn() {
      if (sessionStorage.getItem(TOKEN) != null) {
        console.log(sessionStorage.getItem(TOKEN));
        console.log('yep');
        return true;
      }
      console.log('nah');
    }

}