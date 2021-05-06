import {Component, Input} from '@angular/core';
import {Post} from '../models/post';

@Component({
  selector: 'youtube-post-list',
  template: `
    <youtube-post-card *ngFor="let post of postList" [post]="post"></youtube-post-card>
  `,
  styles: [``]
})

export class PostListComponent {
  @Input() postList: Post[];

  constructor() {
  }
}
