import { Component, OnInit, ViewChild } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private userService: UserService) { }
 
  username:string = '';
  code: string = '';
  checkboxFields = {
    dontShare: '',
    useLoc: '',
    autoShare: ''
  }

  submitted = false;
  

  page = 1;

  ngOnInit(): void {
  }

  //Go to next page
  next() {
    this.page++;
  }

  //Go to previous page
  prev() {
    this.page--;
  }

  toEnterCode() {
    this.page++;
    this.page++;
  }

  //For code input 
  onDigitInput(event){
    let element;
    if (event.code !== 'Backspace')
         element = event.srcElement.nextElementSibling;
 
     if (event.code === 'Backspace')
         element = event.srcElement.previousElementSibling;
 
     if(element == null)
         return;
     else
         element.focus();
 }

 //create random name button, working method...
 createRandomName() {
  let r = Math.random().toString(36).substring(7);
  this.username = r;
  console.log(r);

  //return r;

 }

 //Insert service call here for signup
  signup() {
    this.userService.signup(this.username).subscribe(res => {
      console.log(res);
      if(res) {
        this.code = res.loginCode;
        console.log(res.loginCode);
        this.page++;
        this.submitted = true;
        this.toastr.success('Signup successful. Copy this code for later.');
      }
      else {
        console.log(res);
        this.toastr.error('This functionality is still under development. Try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      }

    });

    //TODO: Create account

    //TODO: Route to the main Shore page if valid
    
  }
}