import { BrowserModule } from '@angular/platform-browser'; // Required Essential to Run Browser Application
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/layout/dashboard.component';
import { HeaderComponent } from './components/layout/header.component';
import { YoutubeLayoutComponent } from './components/layout/youtube-layout.component';
import { MaterialModule } from './material.module';
import { UserListComponent } from './components/user-list.component';
import { UserCardComponent } from './components/user-card.component';
import { UserComponent } from './container/user.component';
import { PostComponent } from './container/post.component';
import { ApiService } from './services/api.service';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    YoutubeLayoutComponent,
    UserListComponent,
    UserCardComponent,
    UserComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [ApiService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
