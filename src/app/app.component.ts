import {Component} from '@angular/core';

@Component({
  selector: 'youtube-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
  `]
})
export class AppComponent {
  constructor() {
  }
}

// my component are dependent on api service
// api service -> http service
// http service -> http client
