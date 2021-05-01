import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
   <app-header></app-header>
   <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
