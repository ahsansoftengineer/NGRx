import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { YoutubeRepository } from '../services/youtube-repository';

@Component({
  selector: 'app-user',
  template: `
    <p>User Works</p>
    <div>
      <youtube-user-list [users]="users"></youtube-user-list>
    </div>
  `,
  styles: [],
})
export class UserComponent implements OnInit {
  users: IUser[];
  // Dependency Injection Principal
  // You should not depend on something directly
  // Component -> youtube repo -> apiService -> HttpService -> HttpClient -> API
  constructor(private youtubeRepository: YoutubeRepository) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    const userData$ = this.youtubeRepository.getUserList()[1];
    userData$.subscribe((data) => {
      this.users = data;
    });
  }
}
