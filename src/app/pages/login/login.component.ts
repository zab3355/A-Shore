import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
    constructor(private router: Router, private toastr: ToastrService) { }
   
    page = 1;

  // ngModel values
    username: string = '';
    code: string = '';
  
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
  
    }
  }