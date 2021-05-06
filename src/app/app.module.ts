import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Required Essential to Run Browser Application
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
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
import { StoreModule } from '@ngrx/store';
// Targeting index.ts File
import { rootReducer } from './reducers';
import { YoutubeRepository } from './services/youtube-repository';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { UpdateUserComponent } from './components/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    YoutubeLayoutComponent,
    UserListComponent,
    UserCardComponent,
    UserComponent,
    PostComponent,
    UpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FlexModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    // Doesn't Required index.ts File Name
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [ApiService, HttpService, YoutubeRepository],
  bootstrap: [AppComponent],
})
export class AppModule {}
