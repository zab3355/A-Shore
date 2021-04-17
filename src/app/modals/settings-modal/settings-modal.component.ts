import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';

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

  logout() {
    ConstantsService.logout();
    this.router.navigateByUrl('login');
  }

  closeModal() {
    this.close.emit(false);
  }

}