import { Injectable, EventEmitter } from '@angular/core';
import { NetworkService } from './network.service';
import { ConstantsService } from './constants.service';
import { HttpParams } from '@angular/common/http'; // yummy not-deprecated stuff

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
    const payload = new HttpParams()
    .set('username', username)
    .set('code', code);
    return this.networkService.httpPost(url, payload);
  }


  signup(username) {
    const url = this.api_url + '/signup';
    const payload = new HttpParams()
    .set('username', username)
    
    return this.networkService.httpPost(url, payload);
  }
}
