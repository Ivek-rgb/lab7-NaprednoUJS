import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'/', component:ForumComponent},
  {path:'/profile', component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumThreadRoutingModule { }
