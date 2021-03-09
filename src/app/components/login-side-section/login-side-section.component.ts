import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login-side-section',
  templateUrl: './login-side-section.component.html',
  styleUrls: ['./login-side-section.component.scss']
})
export class LoginSideSectionComponent implements OnInit {

  @Input() title = '';
  @Input() message = '';

  constructor() { }

  ngOnInit() {
  }

}
