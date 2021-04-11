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

  submitted = false;
  
  page = 1;

  form = new FormGroup({
    location: new FormControl('', Validators.required)
  });

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

 changeLocation(e){
  this.checkValue = e.target.value;
 }

  signup() {
    if(this.username != '' || this.checkValue != null){
    if(this.checkValue == "dontShare"){
      this.userService.signup(this.username).subscribe(res => {
        console.log(res);
        if(res) {
          console.log(res);
          this.code = res.loginCode;
          this.page++;
          this.submitted = true;
          this.toastr.success('Signup successful. Copy this code for later.',  '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        }
        else {
          console.log(res);
          this.toastr.error('Cannot signup. Please check your credentials and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        }
  
      });
    } else if(this.checkValue == "useCurr") {
      //temp values
      this.city = "Henrietta";
      this.country = "US";
      this.userService.addRelativeLocationUser(this.username, this.city, this.country).subscribe(res => {
        console.log(res);
        if(res) {
          console.log(res);
          this.code = res.loginCode;
          this.page++;
          this.submitted = true;
          this.toastr.success('Signup successful. Copy this code for later.',  '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        } else {
            console.log(res);
            this.toastr.error('Cannot signup. Please check your credentials and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        }
      });
    } else if(this.checkValue == "manualEnter") {
        this.userService.addRelativeLocationUser(this.username, this.city, this.country).subscribe(res => {
          console.log(res);
          if(res) {
            console.log(res);
            this.code = res.loginCode;
            this.page++;
            this.submitted = true;
            this.toastr.success('Signup successful. Copy this code for later.',  '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
          } else {
              console.log(res);
              this.toastr.error('Cannot signup. Please check your credentials and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
          }
        });
      }
    } else {
      this.toastr.error('You must fill out a username and whether you would like your location shared to continue.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }
  }
    
}