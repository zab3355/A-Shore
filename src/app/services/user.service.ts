import { Injectable, EventEmitter } from '@angular/core';
import { NetworkService } from './network.service';
import { ConstantsService } from './constants.service';
import { HttpParams } from '@angular/common/http';

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

  addRelativeLocationUser(username, display_name, country){
    const url = this.api_url + '/addRelativeLocationUser';
    const payload = new HttpParams()
    .set('username', username)
    .set('display_name', display_name)
    .set('country', country);
    
    return this.networkService.httpPost(url, payload);
  }

  changeUsername(id, newUsername){
    const url = this.api_url + '/updateUsername';
    const payload = new HttpParams()
    .set('id', id)
    .set('newUsername', newUsername)
    
    return this.networkService.httpPost(url, payload);
  }
}
