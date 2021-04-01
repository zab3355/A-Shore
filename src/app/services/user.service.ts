import { Injectable, EventEmitter } from '@angular/core';
import { NetworkService } from './network.service';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_url;
  constructor(private networkService: NetworkService) {
    this.api_url = ConstantsService.getApiUrl();
  }

  login(username, code) {
    const url = this.api_url + '/login';
    const body = {
      username: username,
      code: code
    }
    return this.networkService.httpPost(url, body);
  }


  signup(userInfo) {
    const url = this.api_url + '/signup';
    const body = {
      username: userInfo.username,
      code: userInfo.code,
      lat: userInfo.lat,
      lng: userInfo.lng
    }
    return this.networkService.httpPost(url, body);
  }


  isUsernameTaken(username) {
    const url = `${this.api_url}/check-username?username=${username}`;

    this.networkService.httpGet(url).subscribe(response => {
      if (response.username) {
        return [true, "Username already registered to an account."]; // username taken
      }
      else {
        return [false, ""];
      }
    });

    return [false, ""];
  }

  isUsernameValid(username) {
    if (username) {

      if (username.length < 5) {
        return [false, "Username must be five or more characters long."]; // length is too short
      }
      if (username.length > 128) {
        return [false, "username cannot be more than 128 characters long."]; // length is too long
      }
    }
    else {
      return [false, "A valid username is required."];
    }
  }




}
