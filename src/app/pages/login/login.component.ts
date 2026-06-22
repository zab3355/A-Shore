import { Component, OnInit, ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodeInput } from 'src/app/types/loginSettings';
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
    constructor(private router: Router, 
      private toastr: ToastrService, 
      private userService: UserService) { }

  // values for code input
    username: string = '';
    code: string[] = [];
    
    loginChecked: boolean = false;
    
    codeTotal: string = '';
    usernameTaken = true;
  
    ngOnInit(): void {
      this.loginChecked = false;

    }
  
    //For code input 
    onDigitInput(event){
      let element;
      if (event.code !== 'Backspace') element = event.srcElement.nextElementSibling;
   
       if (event.code === 'Backspace') element = event.srcElement.previousElementSibling;
   
       if(element == null || 
        event.key === 'Shift' ||
        event.key === 'CapsLock')
           return;
       else
           element.focus();
   }
  
   //Insert service call here for login
   login() {
    this.codeTotal = this.code.join('');
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