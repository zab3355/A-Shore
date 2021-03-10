import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-ribbon',
    templateUrl: './top-ribbon.component.html',
    styleUrls: ['./top-ribbon.component.scss']
  })
export class TopRibbonComponent {

    fname: String = '';
    lname: String = '';

    constructor(private router:Router) {
    }

    editSettings(){
      
    }

    readNotifs(){
      
    }
}


