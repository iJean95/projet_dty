import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { InviteComponent } from './invite/invite.component';
import { PostingComponent } from './posting/posting.component';
import { TimelineComponent } from './timeline/timeline.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'invite', component: InviteComponent, canActivate: [AuthGuard] },
  { path: 'posting', component: PostingComponent, canActivate: [AuthGuard] },
  { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path : 'profile/:id', component : ProfileComponent},
  { path: '', redirectTo: 'timeline', pathMatch: 'full' }

];

@NgModule({
  exports: [ RouterModule
    
  ],

  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
