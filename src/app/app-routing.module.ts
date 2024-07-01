import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './employee/add-user/add-user.component';
import { UserLoginComponent } from './employee/user-login/user-login.component';
import { ListUserComponent } from './employee/list-user/list-user.component';
import { EditUserComponent } from './employee/edit-user/edit-user.component';


const routes: Routes = [
    { path: '', redirectTo: '/Signin', pathMatch: 'full' },
  { path: 'AddContact', component: AddUserComponent },
  { path: 'Signin', component: UserLoginComponent },
  { path: 'ListUser', component: ListUserComponent },
  {path:'logout',component:UserLoginComponent},
  {path: 'edituser/:contactID', component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
