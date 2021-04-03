import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }
  @Output() close = new EventEmitter<any>();

  modalTitle: string = "";
  modalBody: string = "";

  old_username: any = "";
  new_username: any = "";


  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }

}