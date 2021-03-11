import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }
  failed = false;

  email: string = '';
  password: string = '';

  emailValid = true;
  emailTaken = true;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      //  this.router.navigateByUrl('/signup')
    });
  }

  ngAfterViewChecked() {
    Feather.replace();
  }


  login() {
  
  }


  isEmailValid() {
    this.emailValid = true;
    this.emailTaken = true;

  } 

}
