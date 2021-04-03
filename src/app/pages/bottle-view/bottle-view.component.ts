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
  constructor(private router: Router, private toastr: ToastrService,  private resolver: ComponentFactoryResolver, private shoreService: ShoreService) { }
  
  @ViewChild('modalHolder', { read: ViewContainerRef, static: false }) modalHolder;

  title = '';
  paragraph = '';
  ngOnInit() {
    let pickRand = Math.floor((Math.random() * 50) + 1);
    this.shoreService.getMessages().subscribe(res => {
      if (res) {
        console.log(res.data);
        this.title = res.data.content[pickRand];
        this.paragraph = res.data[pickRand];
      }
    });
  }
  
}
