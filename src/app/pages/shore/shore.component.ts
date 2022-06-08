import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shore',
  templateUrl: './shore.component.html',
  styleUrls: ['./shore.component.scss']
})
export class ShoreComponent implements OnInit {

  constructor(private router: Router, 
    private toastr: ToastrService,  
    private resolver: ComponentFactoryResolver) { }
  
  @ViewChild('modalHolder', { read: ViewContainerRef, static: false }) modalHolder;

  ngOnInit(): void {

  }
  
  viewBottle(){
    this.router.navigateByUrl('/bottle-view');
  }

  createBottle(){
    this.router.navigateByUrl('/bottle-create');
  }

  settingsEvent() {
    this.router.navigateByUrl('/settings');
  }
}
