import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bottle-create',
  templateUrl: './bottle-create.component.html',
  styleUrls: ['./bottle-create.component.scss']
})
export class BottleCreateComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService,  private resolver: ComponentFactoryResolver) { }
  
  @ViewChild('modalHolder', { read: ViewContainerRef, static: false }) modalHolder;

  title = '';
  paragraph = '';
  ngOnInit(): void {

  }
  
  viewBottle(){

  }

  createBottle(){

  }

  settingsEvent() {
    
  }
}
