import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Bottle } from 'src/app/types/bottle';
import { ConstantsService } from 'src/app/services/constants.service';
import { ShoreService } from 'src/app/services/shore.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bottle-create',
  templateUrl: './bottle-create.component.html',
  styleUrls: ['./bottle-create.component.scss']
})
export class BottleCreateComponent implements OnInit {

  constructor(private router: Router, 
    private toastr: ToastrService, 
    private shoreService: ShoreService, 
    private resolver: ComponentFactoryResolver) { }
  
  @ViewChild('modalHolder', { read: ViewContainerRef, static: false }) modalHolder;

  bottleObj: Bottle = {

    title: '',
    content: '',
    postedBy: {
       _id: ConstantsService.getID(), 
        username: ''
      },
    locId: ConstantsService.getLocId(),
    comments: null
  };

  ngOnInit(): void {

  }
  
  createBottle(){
    this.bottleObj._id = ConstantsService.getID();
    this.bottleObj.postedBy.username = ConstantsService.getUsername();
    this.bottleObj.locId = ConstantsService.getLocId();
    console.log(this.bottleObj);
    if(this.bottleObj._id !== null){
    this.shoreService.addMessage(this.bottleObj).subscribe(response => {
      this.toastr.success('Message sent out!', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }, (error) => {
        this.toastr.error('An error occured in your reply, please check your reply or try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      });
    } else if(this.bottleObj.locId !== null) {
      this.shoreService.addMessage(this.bottleObj).subscribe(response => {
        this.toastr.success('Message sent out!', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      }, (error) => {
          this.toastr.error('An error occured in your reply, please check your reply or try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        });
    } else {
      this.toastr.error('Could not locate your account in our DB, relogin and try again.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }
  }

}
