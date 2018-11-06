import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { InviteComponent } from './invite/invite.component';
import { PostingComponent } from './posting/posting.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { SocialUserService } from './services/social-user.service';
import { RegisterComponent } from './register/register.component'; 
import { UserService } from './services/user.service';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    InviteComponent,
    PostingComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MyNavComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MDBBootstrapModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    SocialUserService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
