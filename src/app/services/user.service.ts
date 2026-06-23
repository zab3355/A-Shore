import { Injectable, EventEmitter } from '@angular/core';
import { NetworkService } from './network.service';
import { ConstantsService } from './constants.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl;
  constructor(private networkService: NetworkService) {
    this.apiUrl = ConstantsService.getApiUrl();
  }

  login(username, code) {
    const url = this.apiUrl + '/login';
    const payload = new HttpParams()
    .set('username', username)
    .set('code', code);
    return this.networkService.httpPost(url, payload);
  }

  signup(username) {
    const url = this.apiUrl + '/signup';
    const payload = new HttpParams()
    .set('username', username);

    return this.networkService.httpPost(url, payload);
  }
  getAllUsers(){
    const url = `${this.apiUrl}/getAllUsers`;
    return this.networkService.httpGet(url);
  }

  getUser(id){
    const url = `${this.apiUrl}/getUser?id=${id}`;
    return this.networkService.httpGet(url);
  }

  addRelativeLocationUser(username, displayName, country){
    const url = this.apiUrl + '/addRelativeLocationUser';
    const payload = new HttpParams()
    .set('username', username)
    .set('display_name', displayName)
    .set('country', country);

    return this.networkService.httpPost(url, payload);
  }

  changeUsername(id, newUsername){
    const url = this.apiUrl + '/updateUsername';
    const payload = new HttpParams()
    .set('id', id)
    .set('newUsername', newUsername);

    return this.networkService.httpPost(url, payload);
  }
}
