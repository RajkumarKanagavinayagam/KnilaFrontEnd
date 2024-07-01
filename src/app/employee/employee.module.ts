import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { ListUserComponent } from './list-user/list-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';




@NgModule({
  declarations: [
    AddUserComponent,
    UserLoginComponent,
    ListUserComponent,
    EditUserComponent,
    DeletedialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule
  ]
})
export class EmployeeModule { }
