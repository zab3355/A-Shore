import { Injectable, EventEmitter } from '@angular/core';
import { NetworkService } from './network.service';
import { ConstantsService } from './constants.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http'; // yummy not-deprecated stuff


@Injectable({
    providedIn: 'root'
})
export class ShoreService {
    private api_url;
    constructor(private networkService: NetworkService, router:Router) {
        this.api_url = ConstantsService.getApiUrl();
    } 


    getMessages() {
        const url = `${this.api_url}/getMessages`;
        return this.networkService.httpGet(url);
    }

    getMessage(id){
        const url = `${this.api_url}/getMessage?id=${id}`;
        return this.networkService.httpGet(url);
    }

    addComment(id, commentText) {
        const url = this.api_url + '/addComment';
        const payload = new HttpParams()
        .set('id', id)
        .set('commentText', commentText);

        return this.networkService.httpPost(url, payload);
    }

    addViewer(id, viewerId){
        const url = this.api_url + '/addViewer';
        const payload = new HttpParams()
        .set('id', id)
        .set('viewerId', viewerId);

        return this.networkService.httpPost(url, payload);
    }
   
}