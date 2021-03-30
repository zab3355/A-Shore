import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bottle-view-modal',
  templateUrl: './bottle-view-modal.component.html',
  styleUrls: ['./bottle-view-modal.component.scss']
})
export class BottleViewModalComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }
  @Output() close = new EventEmitter<any>();

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }


}
