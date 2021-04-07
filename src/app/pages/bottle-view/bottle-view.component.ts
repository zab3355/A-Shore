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
  commentText ='';

  commentText1 ='';
  commentText2 ='';
  commentText3 ='';

  ngOnInit() {


  }

  loadMessages() {
    let pickRand = Math.floor((Math.random() * 50) + 1);
     this.message_id= pickRand;
     this.shoreService.getMessages().subscribe(res => {
       console.log(res.data);
       console.log(res.data[pickRand].content);

      this.comments = res.data[pickRand].comments;
      console.log(this.comments);
      
      this.viewedBy = res.data[pickRand].viewedBy;
      console.log(this.viewedBy);

      this.message_id = res.data[pickRand]._id;
      console.log(this.message_id);
      this.paragraph = res.data[pickRand].content;
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

  addComment() {
    console.log(this.message_id);
    this.shoreService.addComment(this.message_id, this.commentText).subscribe(response => {
      console.log(response);
      this.page--;
    }, (error) => {
        this.toastr.error('An error occured in your reply, please check your reply or try again later.', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      });

  }
  
}
