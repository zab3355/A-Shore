import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ShoreService } from 'src/app/services/shore.serice';
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


  page = 1;

  message_id: number;
  messagePick;
  pickRand;
  messageObj;

  title = '';
  paragraph = '';
  comments = {
    text: '',
    createdDate: '',
    postedBy: '',

  }
  viewedBy = {

  }

  commentId = '';
  commentText ='';

  commentText1 ='';
  commentText2 ='';
  commentText3 ='';

  ngOnInit() {
    let pickRand = Math.floor((Math.random() * 50) + 1);
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

      this.comments = res.data[this.messagePick].comments;
      console.log(this.comments);

      this.message_id = res.data[this.messagePick]._id;

      //still needs work
      if(this.message_id != null) {
        this.shoreService.addViewer(this.message_id, this.message_id).subscribe(res =>{
          console.log(res.data);
    
        });
      }

      this.viewedBy = res.data[this.messagePick].viewedBy;
      console.log(this.viewedBy);
      
      this.paragraph = res.data[this.messagePick].content;
      console.log(this.paragraph);

      this.commentId = res.data[this.messagePick].comments[0]._id;
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
    console.log(this.message_id);
    this.shoreService.addComment(this.message_id, this.commentText).subscribe(response => {
      console.log(response);
      this.page--;
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
  
}
