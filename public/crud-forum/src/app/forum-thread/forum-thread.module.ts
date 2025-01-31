import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum/forum.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ForumComponent, AccountInfoComponent, ProfileComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
          { path:'', component:ForumComponent },
          { path:'profile', component:ProfileComponent }
    ])
  ],
  exports:[

  ]
})
export class ForumThreadModule { }
