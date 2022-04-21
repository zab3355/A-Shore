import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

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

  checkValue:string = '';
  city:string = '';
  country:string = '';

  checkboxFields = {
    dontShare: '',
    useLoc: '',
    autoShare: ''
  }
  
  signOnCodePage = false;

  form = new FormGroup({
    location: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  //Go to next page
  next() {
    this.signOnCodePage = true;
  }

  //Go to previous page
  prev() {
    this.signOnCodePage = false;
  }

  //For code input 
  onDigitInput(event){
    let element;
     if (event.code === 'Backspace') {
      element = event.srcElement.previousElementSibling;
     } else {
      element = event.srcElement.nextElementSibling;

     }
     if(element == null) {
      return;
     }

     else {
      element.focus();
     }
 }

 //create random name button
 createRandomName() {
  let r = Math.random().toString(36).substring(7);
  this.username = r;
 }

 changeLocation(e){
  this.checkValue = e.target.value;
 }

  signup() {
    console.log(this.username, this.checkValue)
    if(this.username !== '' && this.checkValue !== null && this.checkValue !== ''){
    if(this.checkValue == "dontShare"){
      this.userService.signup(this.username).subscribe(res => {
        if(res) {
          this.code = res.loginCode;
          this.signOnCodePage = true;
          this.toastr.success('Signup successful. Copy this code for later.',  '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        }
        else {
          this.toastr.error('Cannot signup. Please check your credentials and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        }
  
      });
    } else if(this.checkValue == "useCurr") {
      //temp values
      this.city = "West Henrietta, NY";
      this.country = "US";
      this.userService.addRelativeLocationUser(this.username, this.city, this.country).subscribe(res => {
        if(res) {
          this.code = res.loginCode;
          this.signOnCodePage = true;
          this.toastr.success('Signup successful. Copy this code for later.',  '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        } else {
            this.toastr.error('Cannot signup. Please check your credentials and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        }
      });
    } else if(this.checkValue == "manualEnter") {
        this.userService.addRelativeLocationUser(this.username, this.city, this.country).subscribe(res => {
          if(res) {
            this.code = res.loginCode;
            this.signOnCodePage = true;
            this.toastr.success('Signup successful. Copy this code for later.',  '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
          } else {
              this.toastr.error('Cannot signup. Please check your credentials and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
          }
        });
      }
    } else {

        this.toastr.error('Please fill out all fields including location input to continue.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }
  }
    
}