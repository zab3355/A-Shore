import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BottleViewModalComponent } from 'src/app/modals/bottle-view-modal/bottle-view-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shore',
  templateUrl: './shore.component.html',
  styleUrls: ['./shore.component.scss']
})
export class ShoreComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService,  private resolver: ComponentFactoryResolver) { }
  
  @ViewChild('modalHolder', { read: ViewContainerRef, static: false }) modalHolder;

  ngOnInit(): void {

  }
  
  viewBottle(){
    const modal = this.modalHolder.createComponent(this.resolver.resolveComponentFactory(BottleViewModalComponent));
    modal.instance.close.subscribe((response) => {
      if (response) {
       // this.data;
    //    this.data.push(["John Harrison Staff", "The best staff in the world", new Date(2019, 1, 22), true, "Cool Landlord", "Uncool Tenants", "Weird"]);
      }
      this.modalHolder.clear();
    })
  }
}
