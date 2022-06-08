import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { ConstantsService } from 'src/app/services/constants.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private router: Router, 
  private toastr: ToastrService, 
  private userService: UserService) { }
 
  username:string = '';
  code: string = '';
  id = '';

  checkValue:string = '';
  city:string = '';
  country:string = '';

  submitted = false;

  form = new FormGroup({
    location: new FormControl('', Validators.required)
  });

  updateUsername(){
    this.id = ConstantsService.getID();
    if(this.username != null){
    this.userService.changeUsername(this.id, this.username).subscribe(res => {
      console.log(res);
      this.toastr.success('Username changed!', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }, (error) => {
      this.toastr.error('Insert a valid username in this field and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    });
    } else {
        this.toastr.error('Insert a new username in this field and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }
  }

  logout() {
    ConstantsService.logout();
    this.router.navigateByUrl('login');
  }
    
}