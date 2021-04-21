import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ConstantsService } from 'src/app/services/constants.service';
import { ShoreService } from 'src/app/services/shore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bottle-view',
  templateUrl: './bottle-view.component.html',
  styleUrls: ['./bottle-view.component.scss']
})
export class BottleViewComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService,  private resolver: ComponentFactoryResolver, private shoreService: ShoreService) { 
    this.loadMessages();
  }
  @ViewChild('modalHolder', { read: ViewContainerRef, static: false }) modalHolder;

  bottleViewLat:number;
  bottleViewLng:number;
  @Output() bottleViewLatEvent = new EventEmitter<number>();
  @Output() bottleViewLngEvent = new EventEmitter<number>();
  page = 1;

  message_id: number;
  messagePick;
  pickRand;
  messageObj;

  commentUsername;

  title = '';
  paragraph = '';
  comments = {
    text: '',
    createdDate: '',
    postedBy: '',
    numberofLikes: 0
  }
  viewedBy = {

  }

  bottleId = '';
  bottleAuthor = 0;

  commentId = '';
  commentText ='';

  commentText1 ='';
  commentText2 ='';
  commentText3 ='';

  ngOnInit() {
    //let pickRand = Math.floor((Math.random() * 50) + 1);

    //Hardcode select a bottle
    let pickRand = 0;
    this.messagePick = pickRand;
    console.log(this.message_id);
  }

  loadMessages() {
    console.log(this.messagePick);

     this.shoreService.getMessages().subscribe(res => {
       console.log(res.data);
       
       // If messages do not exist yet
      if(res.data == undefined) {
        this.shoreService.populateMessages().subscribe(res => {
          console.log(res.data);
        })
      }

      this.message_id = res.data[this.messagePick]._id;


      this.bottleId = ConstantsService.getID();
      if(this.message_id != null) {
        this.shoreService.addViewer(this.bottleId, this.message_id).subscribe(res =>{
          console.log(res.data);
        });
      }

      this.viewedBy = res.data[this.messagePick].viewedBy;
      console.log(this.viewedBy);
      
      this.title = res.data[this.messagePick].title;
      console.log(this.title);

      this.paragraph = res.data[this.messagePick].content;
      console.log(this.paragraph);

      this.comments = res.data[this.messagePick].comments;
      console.log(this.comments);

      this.commentId = res.data[this.messagePick].comments[0]._id;

      this.bottleAuthor = res.data[this.messagePick].postedBy.locId;
      console.log(this.bottleAuthor);
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

  seeViewers() {
    this.page == 3;
  }

  viewComments() {
    this.page++;
  }

  //Adding a comment
  addComment() {
    this.shoreService.addComment(this.message_id, this.commentText).subscribe(response => {
      this.comments.postedBy = ConstantsService.getID();
      this.commentUsername = ConstantsService.getUsername();
      console.log(response);
      this.page--;
      this.toastr.success('Reply to this bottle was successful!', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      this.loadMessages();
    }, (error) => {
        this.toastr.error('An error occured in your reply, please check your reply or try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      });

  }

  //Liking a comment
  likeComment() {
    console.log(this.message_id);
    console.log(this.commentId);
    this.shoreService.addLikeToComment(this.message_id, this.commentId).subscribe(response => {
      console.log(response);
      this.loadMessages();
    })
  }

  getLocationBottle() {
    console.log(this.bottleAuthor);
          //Location for bottle
          this.shoreService.getLocation(this.bottleAuthor).subscribe(res => {
            console.log("Bottle Location: " + res.data);
            this.bottleViewLat = res.data[0].lat;
            this.bottleViewLng = res.data[0].lng;
            console.log("Bottle Long: " + this.bottleViewLng);
            console.log("Bottle Lat: " + this.bottleViewLat);
          })
    
  }

  mapAccess(bottleViewLat, bottleViewLng){
    this.router.navigate(['/map-view'], { queryParams: { bottleViewLng: bottleViewLng, bottleViewLat: bottleViewLat } });
  }
  
}
