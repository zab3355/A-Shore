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
    private apiUrl;
    constructor(private networkService: NetworkService, router: Router) {
        this.apiUrl = ConstantsService.getApiUrl();
    }

    getMessages() {
        const url = `${this.apiUrl}/getMessages`;
        return this.networkService.httpGet(url);
    }

    getMessage(id){
        const url = `${this.apiUrl}/getMessage?id=${id}`;
        return this.networkService.httpGet(url);
    }

    populateMessages() {
        const url = `${this.apiUrl}/populate`;
        return this.networkService.httpGet(url);
    }

    addMessage(bottleObj: Bottle) {
        const url = this.apiUrl + '/addMessage';
        const payload = new HttpParams()
        .set('content', bottleObj.content)
        .set('postedBy', bottleObj._id)
        .set('title', bottleObj.title);

        return this.networkService.httpPost(url, payload);
    }

    getLocation(id){
        const url = `${this.apiUrl}/getLocation?id=${id}`;
        return this.networkService.httpGet(url);
    }

    addComment(id, commentText) {
        const url = this.apiUrl + '/addComment';
        const payload = new HttpParams()
        .set('id', id)
        .set('commentText', commentText);

        return this.networkService.httpPost(url, payload);
    }

    addViewer(id, viewerId){
        const url = this.apiUrl + '/addViewer';
        const payload = new HttpParams()
        .set('id', id)
        .set('viewerId', viewerId);

        return this.networkService.httpPost(url, payload);
    }

    addLikeToComment(id, commentId) {
        const url = this.apiUrl + '/addLikeToComment';
        const payload = new HttpParams()
        .set('id', id)
        .set('commentId', commentId);

        return this.networkService.httpPost(url, payload);
    }

}
