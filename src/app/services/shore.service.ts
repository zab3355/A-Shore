import { Injectable, EventEmitter } from '@angular/core';
import { NetworkService } from './network.service';
import { ConstantsService } from './constants.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Bottle } from 'src/app/types/bottle';
@Injectable({
    providedIn: 'root'
})
export class ShoreService {
    private api_url;
    constructor(private networkService: NetworkService, router: Router) {
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

    populateMessages() {
        const url = `${this.api_url}/populate`;
        return this.networkService.httpGet(url);
    }

    addMessage(bottleObj: Bottle) {
        const url = this.api_url + '/addMessage';
        const payload = new HttpParams()
        .set('content', bottleObj.content)
        .set('postedBy', bottleObj._id)
        .set('title', bottleObj.title);
        
        return this.networkService.httpPost(url, payload);
    }

    getLocation(id){
        const url = `${this.api_url}/getLocation?id=${id}`;
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

    addLikeToComment(id, commentId) {
        const url = this.api_url + '/addLikeToComment';
        const payload = new HttpParams()
        .set('id', id)
        .set('commentId', commentId);

        return this.networkService.httpPost(url, payload);
    }

}