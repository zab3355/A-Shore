import { Injectable, EventEmitter } from '@angular/core';

import { NetworkService } from './network.service';
import { ConstantsService } from './constants.service';
//import { Body } from '@angular/http/src/body';
import { Router } from '@angular/router';

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

    //Put endpoints below this line



    //Don't delete this... Pls use this structure when connecting an endpoint

    //GET Call Example
    /*getClientCase(case_id) {
        const url = `${this.api_url}/client/case?case_id=${case_id}`;
        return this.networkService.httpGet(url);
    }
    */

    //POST Call Example
    /*createActionsForCase(case_id, action_items) {
        const url = `${this.api_url}${ConstantsService.getRouteFromRole()}/case/add-actions`;
        const post_body = {
            case_id: case_id,
            action_items: action_items
        }
        return this.networkService.httpPost(url, post_body);
    }
    */

    //PUT Call Example
    /*    giveTitle(case_id, case_title) {
        const url = `${this.api_url}${ConstantsService.getRouteFromRole()}/case/title`;
        const put_body = {
            case_id: case_id,
            case_title: case_title
        }
        return this.networkService.httpPut(url, put_body);
    }
    */

    //DELETE Call Example 
    /*
    deleteActionItem(action_item_id) {
        const url = `${this.api_url}${ConstantsService.getRouteFromRole()}/case/delete/action`;
        const delete_body = {
            action_item_id: action_item_id
        }
        return this.networkService.httpDelete(url, delete_body);
    }
    */
   
}