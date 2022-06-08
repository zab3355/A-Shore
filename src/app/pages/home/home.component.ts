import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService) { }
 
  onStartScreen: boolean = false;
  onEnterPage: boolean = false;
  onSelectPage: boolean = false;

  // Onload, lifecycle hook puts user onto start screen
  ngOnInit(): void {
    this.onStartScreen = true;
    this.onEnterPage = false;
    this.onSelectPage = false;
  }

  //When screen is clicked on start, go to enter page
  startClick() {
    this.onEnterPage = true;
    this.onStartScreen = false;
    this.onSelectPage = false;
  }

  //If enter is clicked, able to select login or signup page
  enterClick() {
    this.onSelectPage = true;
    this.onEnterPage = false;
    this.onStartScreen = false;
  }
}
