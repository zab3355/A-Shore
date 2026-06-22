import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ConstantsService } from 'src/app/services/constants.service';
import { ShoreService } from 'src/app/services/shore.service';
import { ToastrService } from 'ngx-toastr';
import { Bottle, Comments } from 'src/app/types/bottle';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bottle-view',
  templateUrl: './bottle-view.component.html',
  styleUrls: ['./bottle-view.component.scss']
})
export class BottleViewComponent implements OnInit {
  constructor(private router: Router, 
    private toastr: ToastrService, 
    private resolver: ComponentFactoryResolver, 
    private shoreService: ShoreService,
    private userService: UserService) { 
  }
  @Output() bottleViewLatEvent = new EventEmitter<number>();
  @Output() bottleViewLngEvent = new EventEmitter<number>();
  page = 1;

  messageObj;
  bottles: number;
  commentUsername;

  comments: Comments;
  viewedBy = {}

  bottleId = '';
  messagePick: number = 0
  commentId: String = '';
  commentText ='';
  bottleData: Bottle ={
    title: '',
    postedBy: { _id: ''},
    comments: {},
    content: '',
    bottleViewLat: 0,
    bottleViewLng: 0
  };

  ngOnInit() {
    this.loadMessages();
    
      //Hardcode select a bottle
      //let pickRand = 50;
      //this.messagePick = pickRand;
  }

  loadMessages() {
     this.shoreService.getMessages().subscribe(res => {
       // If messages do not exist yet
      if(res.data == undefined) {
        this.shoreService.populateMessages().subscribe();
      }
      if(this.messagePick === 0){
      this.bottles = res.data.length;
      let pickRand = Math.floor((Math.random() * this.bottles) + 1);
  
      //Hardcode select a bottle
      //let pickRand = 0;
      this.messagePick = pickRand;
      } 
      this.bottleData = res.data[this.messagePick];
      console.log(this.bottleData);

      this.getCommentUsername(this.bottleData.comments);

      this.bottleId = ConstantsService.getID();
      if(this.bottleData._id != null) {
        this.shoreService.addViewer(this.bottleId, this.bottleData._id).subscribe(res =>{
        });
      }

      this.viewedBy = res.data[this.messagePick].viewedBy;
      this.comments = this.bottleData.comments;
      console.log(this.comments);

      if(!this.bottleData.bottleViewLng && !this.bottleData.bottleViewLat)
      this.getLocationBottle();
     })
  }

  //Go to next page
  next() {
    this.page++;
  }

  //Go to previous page
  prev() {
    this.page--;
  }
  
  //View comments page
  viewComments() {
    this.page++;
  }

  getCommentUsername(commentObj: Comments) {
    
  }

  //Adding a comment
  addComment() {
    console.log(this.bottleData._id, this.commentText);
    this.shoreService.addComment(this.bottleData._id, this.commentText).subscribe(response => {
      if (response) {
        this.bottleData.comments.postedBy = ConstantsService.getID();
        this.userService.getAllUsers().subscribe(res => {
          console.log(res);
        });
        this.bottleData.comments.postedBy = ConstantsService.getUsername();
        this.page--;
        this.toastr.success('Reply to this bottle was successful!', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        this.loadMessages();
      }
      else {
        this.toastr.error('An error occured in your reply, please check your reply or try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      }
    }, (error) => {
        this.toastr.error('An error occured in your reply, please check your reply or try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      });

  }

  //Liking a comment
  likeComment(index) {
    this.commentId = this.bottleData.comments[index]._id;
    console.log(this.commentId, this.bottleData._id);
    this.shoreService.addLikeToComment(this.bottleData._id, this.commentId).subscribe(response => {
      if (response) {
        console.log(response);
        this.loadMessages();
      }  
      else {
        this.toastr.error('Cannot like this comment, try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      }
    })
  }

  //Get bottle location
  getLocationBottle() {
    this.userService.getAllUsers().subscribe(res => {
      if(res.data) {
       
        console.log(res.data);

      }
    });
    console.log("loc", this.bottleData.postedBy._id);
    this.shoreService.getLocation(this.bottleData.postedBy._id).subscribe(res => {
      if(res.data.length > 0){
        this.bottleData.bottleViewLat = res.data[0].lat;
        this.bottleData.bottleViewLng = res.data[0].lng;
        console.log(this.bottleData, "locupdate")
      }
      })
  }

  //Access the map and use query params for map coords
  mapAccess(bottleViewLat, bottleViewLng){
    console.log(this.bottleData)
    if(this.bottleData.locId != null || this.bottleData.locId != undefined){
      if(this.bottleData.bottleViewLat != null || this.bottleData.bottleViewLat != undefined ) {
        this.router.navigate(['/map-view'], { queryParams: { bottleViewLng: bottleViewLng, bottleViewLat: bottleViewLat } });
      } 
      else {
        this.toastr.error('The user did not share their location for this bottle.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      }
    }
    else {
      this.toastr.error('The user did not share their location for this bottle.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }
  }
  
}
