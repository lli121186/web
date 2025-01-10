import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EditComponent } from './profile/edit/edit.component';
import { MessagesComponent } from './chat/messages/messages.component';

const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'profile', component: EditComponent },
  { path: 'chat', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
