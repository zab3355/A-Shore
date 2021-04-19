import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ConstantsService } from 'src/app/services/constants.service';
import { ShoreService } from 'src/app/services/shore.serice';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bottle-create',
  templateUrl: './bottle-create.component.html',
  styleUrls: ['./bottle-create.component.scss']
})
export class BottleCreateComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private shoreService: ShoreService, private resolver: ComponentFactoryResolver) { }
  
  @ViewChild('modalHolder', { read: ViewContainerRef, static: false }) modalHolder;

  title = '';
  paragraph = '';
  name = '';
  locId = '';
  id= '';

  ngOnInit(): void {
  }
  
  createBottle(){
    this.id = ConstantsService.getID();
    this.locId = ConstantsService.getLocId();
    if(this.id != null){
    this.shoreService.addMessage(this.paragraph, this.id, this.title).subscribe(response => {
      console.log(response);
      this.toastr.success('Message sent out!', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }, (error) => {
        this.toastr.error('An error occured in your reply, please check your reply or try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      });
    } else if(this.locId != null) {
      this.shoreService.addMessage(this.paragraph, this.locId, this.title).subscribe(response => {
        console.log(response);
        this.toastr.success('Message sent out!', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      }, (error) => {
          this.toastr.error('An error occured in your reply, please check your reply or try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        });
    } else {
      this.toastr.error('Could not locate your account in our DB, relogin and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }
  }

  settingsEvent() {
    
  }
}
