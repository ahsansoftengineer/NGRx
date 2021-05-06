import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {UsersComponent} from './containers/users.component';
import {PostComponent} from './containers/post.component';
import {DashboardComponent} from './components/layout/dashboard.component';
import {HeaderComponent} from './components/layout/header.component';
import {LayoutComponent} from './components/layout/youtube-layout.component';
import {MaterialModule} from './material.module';
import {HttpService} from './services/http.service';
import {ApiService} from './services/api.service';
import {UserCardComponent} from './components/user-card.component';
import {UserListComponent} from './components/user-list.component';
import {StoreModule} from '@ngrx/store';
import {rootReducer} from './reducers';
import {YoutubeRepository} from './services/youtube-repository';
import {ErrorComponent} from './components/error.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {UpdateUserComponent} from './components/update-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ViewUserComponent} from './containers/view-user.component';
import {PostListComponent} from './components/post-list.component';
import {PostCardComponent} from './components/post-card.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PostComponent,
    DashboardComponent,
    HeaderComponent,
    LayoutComponent,
    UserCardComponent,
    UserListComponent,
    ErrorComponent,
    UpdateUserComponent,
    ViewUserComponent,
    PostListComponent,
    PostCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [HttpService, ApiService, YoutubeRepository],
  bootstrap: [AppComponent]
})
export class AppModule {
}
