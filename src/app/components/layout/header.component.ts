import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'youtube-header',
  template: `
    <mat-toolbar color="primary" style="height:85px, padding:0px 16px">
      <div fxLayoutAlign="start center" fx-Flex="100%" fx-Hide.xs>
        <button mat-button routerLink="" [routerLinkActiveOptions]="{exact: true}" routerLinkActive="selected">
          User
        </button>
        <button mat-button routerLink="/post" routerLinkActive="selected">
          Post
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .selected{
      background: green;
    }
  `],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
