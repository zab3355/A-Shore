import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-top-ribbon',
    templateUrl: './top-ribbon.component.html',
    styleUrls: ['./top-ribbon.component.scss']
  })
export class TopRibbonComponent {

  user = {
    id: '',
    username: ''
  }

    constructor(private router: Router, private constantsService: ConstantsService, private userService: UserService, private resolver: ComponentFactoryResolver) { }
    name = 'Test!';  

    @ViewChild(LoginComponent) login: LoginComponent;

    ngOnInit() {
      console.log(this.login.username); 
      this.name = this.login.username;
      console.log(this.user.username);
    }
    
    editSettings(){
      
    }

    readNotifs(){
      
    }
}


