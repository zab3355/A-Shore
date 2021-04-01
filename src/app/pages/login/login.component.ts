import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
    constructor(private router: Router, private toastr: ToastrService, private userService: UserService) { }
   
    page = 1;

  // ngModel values
    username: string = '';
    code: string = '';

    usernameTaken = true;
  
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
  
   //Insert service call here for login
   login() {
    this.userService.login(this.username, this.code).subscribe(response => {
      console.log(response);
      const user = {
        username: response.username,
        code: response.code
      };
     // ConstantsService.setUserInfo(user);
    }, (error) => {
      this.code = '';
      this.toastr.error('Incorrect Login', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    });
  }

  isUsernameValid() {
    this.usernameTaken = true;

   /* if (this.userService.isUsernameTaken(this.username)) {
      document.getElementById("usernameEnter").classList.remove("error");
        this.usernameTaken = true;
        return true;
      }
      else {
        this.usernameTaken = false;
        return false;
      }*/
    }
}