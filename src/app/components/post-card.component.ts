import { Component, Input } from '@angular/core';
import { Post } from '../models/post';
import { Comment } from '../models/post';
import { YoutubeRepository } from '../services/youtube-repository';

@Component({
  selector: 'youtube-post-card',
  template: `
    <mat-card fxLayout="column">
      <mat-card-title>{{ post.title }}</mat-card-title>
      <mat-card-content fxLayout="column">
        <div style="margin: 5px" fxLayout="row" fxLayoutGap="30px" *ngFor="let comment of post.comments">
          <p>{{ comment.description }}</p>
          <button (click)="updateComment(comment)" mat-button color="accent">
            Edit
          </button>
          <button (click)="deleteComment(comment.id)" mat-button color="warn">
            Delete
          </button>
        </div>
        <div fxFlex="row" fxLayoutGap="30px">
          <mat-form-field>
            <input
              [(ngModel)]="commentDescription"
              matInput
              placeholder="Enter your Comment"
            />
          </mat-form-field>
          <button (click)="addComment()" mat-raised-button color="primary">
            Add
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        width: 50%;
        margin: 20px;
      }
    `,
  ],
})
export class PostCardComponent {
  @Input() post: Post;
  commentDescription = '';
  postId: number;
  commentId: number;

  constructor(private youtubeRepository: YoutubeRepository) {}

  addComment() {
    const comment: Comment = {
      id: 124,
      description: this.commentDescription,
    };
    this.youtubeRepository.addComment(comment, this.post.id);
  }

  deleteComment(id: number) {
    this.youtubeRepository.deleteComment(id, this.post.id);
  }
  updateComment(comment: Comment, postId: number, commentId: number) {
    this.postId = postId;
    this.commentId = commentId;
    // this.youtubeRepository.updateComment(comment, this.post.id)
  }
}
