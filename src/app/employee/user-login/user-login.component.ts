import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthModel } from '../Model/auth-model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  AuthModel: AuthModel = new AuthModel();
constructor(private userService: UserService,private toastr: ToastrService, private router: Router){}

 onSubmit(form: NgForm): void {
    debugger;
    if (form.invalid) {
      return; 
    }
    this.userService.loginuserData(this.AuthModel).subscribe(
      response => {
        debugger;
        // Handle successful response
        if(response.isSuccess == true)
        {
         sessionStorage.setItem('AccessToken', response.token);
         sessionStorage.setItem('RefreshToken', response.refreshToken);
          this.router.navigate(['/ListUser']);
        }
        else
        {
          this.toastr.warning("Oops! Login Fail");
        }
        console.log(response);
      },
      error => {
        // Handle error
        this.toastr.error("something went wrong!")
      }
    );
  }
}
