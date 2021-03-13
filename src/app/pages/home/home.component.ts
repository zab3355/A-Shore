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
 
  page = 1;

  ngOnInit(): void {
  }

  next() {
    this.page++;
  }

  toEnterCode() {
    this.page++;
    this.page++;
  }

  login() {
    
  }
}
