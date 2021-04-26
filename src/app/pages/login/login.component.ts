import { Component, OnInit, ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
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
  
    constructor(private router: Router, private toastr: ToastrService, private resolver: ComponentFactoryResolver, private userService: UserService) { }
   
    page = 1;

  // ngModel values
    username: string = '';
    code = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: ''
    }
    
    codeTotal: string = '';
    usernameTaken = true;
  
    ngOnInit(): void {
      this.codeTotal = this.code.input1 + this.code.input2 + this.code.input3 + this.code.input4 + this.code.input5 + this.code.input6;
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
    this.codeTotal = this.code.input1 + this.code.input2 + this.code.input3 + this.code.input4 + this.code.input5 + this.code.input6;
    this.userService.login(this.username, this.codeTotal).subscribe(response => {
      const user = {
        username: response.username,
        codeTotal: response.codeTotal,
        locId: response.locId,
        _id: response._id
      };
      console.log(user);
      //check if ID exists, if so save the local storage token and login
      ConstantsService.saveToken(response._id);
      ConstantsService.setUserInfo(user);
      this.router.navigateByUrl('/shore');

    }, (error) => {
      this.toastr.error('Incorrect Login', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    });
  }

  isUsernameValid() {
    this.usernameTaken = true;
    }
}