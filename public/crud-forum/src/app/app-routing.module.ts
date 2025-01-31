import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth.guard';
import { ForumThreadModule } from './forum-thread/forum-thread.module';

const routes: Routes = [
  { path:'', loadChildren: () => ForumThreadModule, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => AuthModule },
  { path:'**', loadChildren: () => ForumThreadModule, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
