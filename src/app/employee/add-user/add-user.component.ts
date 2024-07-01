import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { UserModel } from '../Model/user-model';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userData: UserModel = new UserModel();
  
constructor(private userService: UserService,private toastr: ToastrService, private router: Router,){}

 onSubmit(form: NgForm): void {
    debugger;
    if (form.invalid) {
      return; 
    }
    this.userService.adduserData(this.userData).subscribe(
      response => {
        // Handle successful response
        if(response.isSuccess == true)
        {
          
          this.toastr.success("User Register succesfully");
          //this.dialogRef.close();
          this.router.navigate(['/ListUser']);
          // const currentUrl = this.router.url;
          // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          //   this.router.navigate([currentUrl]);
          // });
        }
        else
        {
          this.toastr.warning("Oops! Pharmacy Not Added");
        }
        console.log(response);
      },
      error => {
        // Handle error
        this.toastr.error("something went wrong!")
      }
    );
  }
   onKeyPress(event: KeyboardEvent): void {
   
    const inputChar = String.fromCharCode(event.charCode);
    // Allow digits (0-9) and "+" symbol at the beginning of the input
    if (!/^(\+?[0-9]*)$/.test(inputChar) && event.charCode !== 43) {
      event.preventDefault();
  }
  }
  maxLength: number = 100;
  onKeyUpChar(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > this.maxLength) {
      input.value = input.value.slice(0, this.maxLength);
    }
  }
  onKeyDownChar(event: KeyboardEvent): void {
    // Allow only alphabetic characters and spaces
    if (!(event.key.match(/^[a-zA-Z\s]*$/))) {
      event.preventDefault();
    }
  }
  closeDialog() {
    this.router.navigate(['/ListUser']);
  }
 
}
